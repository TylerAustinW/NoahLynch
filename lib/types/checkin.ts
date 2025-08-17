export interface Show {
    id: number;
    date: string;
    venue: string;
    city: string;
    state: string;
    time?: string;
    description?: string;
    ticket_link?: string;
    created_at?: string;
}

export interface CheckIn {
    id?: number;
    show_id: number;
    name: string;
    feedback?: string;
    created_at?: string;
}
export interface CheckInFormData {
    show_id: string;
    name: string;
    feedback?: string;
    media: File | null;
    termsAgreed: boolean;
}

export interface CheckInSubmissionResponse {
    success: boolean;
    message: string;
    checkin_id?: string;
    error?: string;
}

export interface FileUploadProgress {
    file: File;
    progress: number;
    url?: string;
    error?: string;
}

export interface CheckInGalleryItem {
    checkin_id: string;
    name: string;
    feedback?: string;
    created_at: string;
    venue: string;
    city: string;
    state: string;
    show_date: string;
    file_url: string;
    file_type: string;
    file_size: number;
}
