'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ShowSelector from './show-selector';
import { API_ENDPOINTS, FILE_UPLOAD, ROUTES } from '@/lib/config/constants';
import {
  compressImage,
  createImagePreview,
  formatFileSize,
  validateFileSize,
  validateFileType,
} from '@/lib/utils/media';
import type { CheckInFormData, CheckInSubmissionResponse } from '@/lib/types/checkin';

export default function CheckInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedShowId = searchParams.get('show');

  const [formData, setFormData] = useState<CheckInFormData>({
    show_id: preselectedShowId || '',
    name: '',
    feedback: '',
    media: null,
    termsAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    if (error) setError(null);
  }, [formData, error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowSelect = (showId: string) => {
    setFormData((prev) => ({
      ...prev,
      show_id: showId,
    }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFormData((prev) => ({ ...prev, media: null }));
      setMediaPreview(null);
      return;
    }

    // Debug logging
    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validate file type (image or video)
    if (!validateFileType(file, ['image', 'video'])) {
      setError('Please upload an image or video file');
      e.target.value = '';
      return;
    }

    // Validate file size (10MB limit)
    if (!validateFileSize(file, FILE_UPLOAD.MAX_SIZE / (1024 * 1024))) {
      setError(`File size must be less than ${formatFileSize(FILE_UPLOAD.MAX_SIZE)}`);
      e.target.value = '';
      return;
    }

    // Handle image files
    if (file.type.startsWith('image/')) {
      try {
        setIsCompressing(true);
        setError(null);

        // Create preview
        const preview = await createImagePreview(file);
        setMediaPreview(preview);

        // Compress image if it's larger than 1MB
        let processedFile: File | Blob = file;
        if (file.size > 1024 * 1024) {
          processedFile = await compressImage(file, 1920, 1080, 0.8);
          // Convert Blob to File to maintain the name
          processedFile = new File([processedFile], file.name, { type: file.type });
        }

        setFormData((prev) => ({
          ...prev,
          media: processedFile as File,
        }));
      } catch (err) {
        console.error('Error processing image:', err);
        setError('Failed to process image. Please try another file.');
        e.target.value = '';
      } finally {
        setIsCompressing(false);
      }
    } else {
      // For video files, just set without compression
      setFormData((prev) => ({
        ...prev,
        media: file,
      }));
      setMediaPreview(null); // No preview for videos in this simple implementation
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      termsAgreed: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.show_id) {
      setError('Please select a show');
      return;
    }

    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!formData.media) {
      setError("Please upload a photo or video from tonight's show");
      return;
    }

    if (!formData.termsAgreed) {
      setError('Please agree to the terms to continue');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('show_id', formData.show_id);
      submitData.append('name', formData.name.trim());
      if (formData.feedback?.trim()) {
        submitData.append('feedback', formData.feedback.trim());
      }
      submitData.append('media_0', formData.media);

      const response = await fetch(API_ENDPOINTS.CHECKIN, {
        method: 'POST',
        body: submitData,
      });

      const result: CheckInSubmissionResponse = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || 'Something went wrong. Please try again.');
        return;
      }

      router.push(`${ROUTES.CHECKIN_SUCCESS}?id=${result.checkin_id}`);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-800/50 rounded-lg p-8 backdrop-blur-sm">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Check In</h2>
        <p className="text-zinc-400">Share your name and a photo from tonight's show</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ShowSelector selectedShowId={formData.show_id} onShowSelect={handleShowSelect} />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-white mb-2">
            Upload a Photo or Video
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*,video/*"
            onChange={handlePhotoChange}
            required
            disabled={isCompressing}
            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-600 file:text-white hover:file:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {isCompressing && <p className="text-sm text-amber-400 mt-2">Processing image...</p>}
          {formData.media && !isCompressing && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-zinc-400">
                Selected: {formData.media.name} ({formatFileSize(formData.media.size)})
              </p>
              {mediaPreview && (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-zinc-800">
                  <img src={mediaPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              {formData.media.type.startsWith('video/') && (
                <p className="text-xs text-zinc-500">Video preview not available</p>
              )}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-white mb-2">
            How was the show?
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Share your thoughts about tonight's performance..."
          />
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleTermsChange}
            required
            className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-zinc-600 bg-zinc-700 rounded"
          />
          <label htmlFor="termsAgreed" className="text-sm text-zinc-300 leading-5">
            By filling out this form, I grant <strong className="text-white">Noah Lynch</strong>{' '}
            permission to use photos and/or videos on social media platforms.
          </label>
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-600 rounded-lg">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isCompressing}
          className={`
            w-full py-4 px-6 rounded-lg font-medium text-lg transition-all
            ${
              isSubmitting || isCompressing
                ? 'bg-zinc-600 cursor-not-allowed text-zinc-400'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }
          `}
        >
          {isSubmitting
            ? 'Submitting...'
            : isCompressing
              ? 'Processing...'
              : 'Share Your Experience ✨'}
        </button>
      </form>
    </div>
  );
}
