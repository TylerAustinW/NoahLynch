import { type NextRequest, NextResponse } from 'next/server';
import { supabaseAnonymous } from '@/lib/supabase/server';
import { SUPABASE_BUCKETS, SUPABASE_TABLES } from '@/lib/config/constants';
import type { CheckInSubmissionResponse } from '@/lib/types/checkin';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const showId = formData.get('show_id') as string;
    const name = formData.get('name') as string;
    const feedback = formData.get('feedback') as string | null;

    if (!showId || !name) {
      return NextResponse.json<CheckInSubmissionResponse>(
        {
          success: false,
          message: 'Show ID and name are required',
          error: 'Show ID and name are required',
        },
        { status: 400 }
      );
    }

    const { data: checkinData, error: checkinError } = await supabaseAnonymous
      .from(SUPABASE_TABLES.CHECKINS)
      .insert({
        show_id: showId,
        name: name.trim(),
        feedback: feedback?.trim() || null,
      })
      .select()
      .single();

    if (checkinError) {
      console.error('Error inserting check-in:', checkinError);
      return NextResponse.json<CheckInSubmissionResponse>(
        {
          success: false,
          message: 'Failed to save check-in',
          error: 'Database error',
        },
        { status: 500 }
      );
    }

    const mediaFields = Array.from(formData.keys()).filter((key) => key.startsWith('media_'));

    for (const fieldName of mediaFields) {
      const file = formData.get(fieldName) as File;
      if (file && file.size > 0) {
        try {
          const timestamp = Date.now();
          const randomId = Math.random().toString(36).substring(2);
          const fileExtension = file.name.split('.').pop() || 'bin';
          const fileName = `${checkinData.id}/${timestamp}-${randomId}.${fileExtension}`;

          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);

          const { error: uploadError } = await supabaseAnonymous.storage
            .from(SUPABASE_BUCKETS.CHECKIN_MEDIA)
            .upload(fileName, uint8Array, {
              contentType: file.type,
              upsert: false,
            });

          if (uploadError) {
            console.error('Error uploading file:', uploadError);
            continue;
          }

          const {
            data: { publicUrl },
          } = supabaseAnonymous.storage.from(SUPABASE_BUCKETS.CHECKIN_MEDIA).getPublicUrl(fileName);

          const fileType = file.type.startsWith('image/') ? 'image' : 'video';
          const { error: mediaInsertError } = await supabaseAnonymous
            .from(SUPABASE_TABLES.CHECKIN_MEDIA)
            .insert({
              checkin_id: checkinData.id,
              file_url: publicUrl,
              file_type: fileType,
              file_size: file.size,
            });
          
          if (mediaInsertError) {
            console.error('Error inserting media record:', mediaInsertError);
            console.error('Media insert details:', {
              checkin_id: checkinData.id,
              file_url: publicUrl,
              file_type: fileType,
              file_size: file.size,
            });
          } else {
            console.log('Successfully inserted media record for checkin:', checkinData.id);
          }
        } catch (fileError) {
          console.error('Error processing file:', fileError);
        }
      }
    }

    return NextResponse.json<CheckInSubmissionResponse>({
      success: true,
      message: 'Check-in successful!',
      checkin_id: checkinData.id,
    });
  } catch (error) {
    console.error('Check-in submission error:', error);
    return NextResponse.json<CheckInSubmissionResponse>(
      {
        success: false,
        message: 'Internal server error',
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
