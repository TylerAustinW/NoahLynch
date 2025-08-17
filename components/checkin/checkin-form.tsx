"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import ShowSelector from "./show-selector";
import { API_ENDPOINTS, FILE_UPLOAD, ROUTES, SUPABASE_TABLES } from "@/lib/config/constants";
import { compressImage, createImagePreview, formatFileSize, validateFileSize, validateFileType } from "@/lib/utils/media";
import type { CheckInFormData, CheckInSubmissionResponse } from "@/lib/types/checkin";
import { supabase } from "@/lib/supabase/client";
import { CheckCircle, Loader2, Upload } from "lucide-react";
import { track } from "@vercel/analytics";

export default function CheckInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedShowId = searchParams.get("show");

    const [formData, setFormData] = useState<CheckInFormData>({
        show_id: preselectedShowId || "",
        name: "",
        feedback: "",
        media: null,
        termsAgreed: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mediaPreview, setMediaPreview] = useState<string | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [selectedShowInfo, setSelectedShowInfo] = useState<{
        id: number;
        venue: string;
        city: string;
        state: string;
        date: string;
        time?: string;
    } | null>(null);

    useEffect(() => {
        if (error) setError(null);
    }, [formData, error]);

    useEffect(() => {
        async function fetchShowInfo() {
            if (formData.show_id) {
                try {
                    const { data: show } = await supabase
                        .from(SUPABASE_TABLES.SHOWS)
                        .select("*")
                        .eq("id", formData.show_id)
                        .single();
                    setSelectedShowInfo(show);
                } catch (error) {
                    console.error("Error fetching show info:", error);
                }
            } else {
                setSelectedShowInfo(null);
            }
        }
        fetchShowInfo();
    }, [formData.show_id]);

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

        if (showId) {
            track("checkin_show_selected", { show_id: showId });
        }
    };

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setFormData((prev) => ({ ...prev, media: null }));
            setMediaPreview(null);
            return;
        }

        track("checkin_photo_upload_started", {
            file_type: file.type,
            file_size: file.size,
        });

        if (!validateFileType(file, ["image", "video"])) {
            setError(`File type "${file.type}" is not supported. Please upload a JPG, PNG, WebP image or MP4 video.`);
            e.target.value = "";
            return;
        }

        const isVideo = file.type.startsWith("video/");
        const maxSize = isVideo ? FILE_UPLOAD.MAX_VIDEO_SIZE : FILE_UPLOAD.MAX_IMAGE_SIZE;

        if (!validateFileSize(file, maxSize / (1024 * 1024))) {
            setError(
                `File is too large (${formatFileSize(file.size)}). Maximum size for ${isVideo ? "videos" : "images"} is ${formatFileSize(maxSize)}.`,
            );
            e.target.value = "";
            return;
        }

        if (file.type.startsWith("image/")) {
            try {
                setIsCompressing(true);
                setError(null);

                const preview = await createImagePreview(file);
                setMediaPreview(preview);

                let processedFile: File | Blob = file;
                if (file.size > 1024 * 1024) {
                    processedFile = await compressImage(file, 1920, 1080, 0.8);
                    processedFile = new File([processedFile], file.name, { type: file.type });
                }

                setFormData((prev) => ({
                    ...prev,
                    media: processedFile as File,
                }));
            } catch (err) {
                console.error("Error processing image:", err);
                setError(
                    `Failed to process image: ${err instanceof Error ? err.message : "Unknown error"}. Please try another file or a smaller image.`,
                );
                e.target.value = "";
                setMediaPreview(null);
            } finally {
                setIsCompressing(false);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                media: file,
            }));
            setMediaPreview(null);
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
            setError("Please select a show");
            return;
        }

        if (!formData.name.trim()) {
            setError("Please enter your name");
            return;
        }

        if (!formData.media) {
            setError("Please upload a photo or video from tonight's show");
            return;
        }

        if (!formData.termsAgreed) {
            setError("Please agree to the terms to continue");
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            submitData.append("show_id", formData.show_id);
            submitData.append("name", formData.name.trim());
            if (formData.feedback?.trim()) {
                submitData.append("feedback", formData.feedback.trim());
            }
            submitData.append("media_0", formData.media);

            const response = await fetch(API_ENDPOINTS.CHECKIN, {
                method: "POST",
                body: submitData,
            });

            const result: CheckInSubmissionResponse = await response.json();

            if (!response.ok || !result.success) {
                setError(result.error || "Something went wrong. Please try again.");
                return;
            }

            track("checkin_submitted_successfully", {
                show_id: formData.show_id,
                has_feedback: !!formData.feedback?.trim(),
                has_media: !!formData.media,
            });

            router.push(`${ROUTES.CHECKIN_SUCCESS}?id=${result.checkin_id}`);
        } catch (err) {
            console.error("Submission error:", err);
            setError("Network error. Please check your connection and try again.");
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

                {preselectedShowId && selectedShowInfo && (
                    <div className="bg-amber-600/20 border border-amber-500/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center mb-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
                            <h3 className="text-amber-200 font-semibold">QR Code Check-in</h3>
                        </div>
                        <p className="text-amber-100 text-sm mb-2">
                            You've scanned the QR code for <strong>{selectedShowInfo.venue}</strong>
                        </p>
                        <div className="text-xs text-amber-200/80">
                            {selectedShowInfo.city}, {selectedShowInfo.state} •{" "}
                            {new Date(selectedShowInfo.date + "T00:00:00").toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                            {selectedShowInfo.time && ` • ${selectedShowInfo.time}`}
                        </div>
                    </div>
                )}

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
                        className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-600 file:text-white hover:file:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    />
                    {isCompressing && (
                        <div className="mt-3 flex items-center gap-3 p-3 bg-amber-600/10 border border-amber-500/30 rounded-lg">
                            <Upload className="w-4 h-4 text-amber-500 animate-pulse" />
                            <div className="flex-1">
                                <p className="text-sm text-amber-400 font-medium">Processing image...</p>
                                <div className="w-full bg-amber-900/30 rounded-full h-2 mt-1">
                                    <div className="bg-amber-500 h-2 rounded-full animate-pulse" style={{ width: "70%" }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {formData.media && !isCompressing && (
                        <div className="mt-3 space-y-2">
                            <p className="text-sm text-zinc-400">
                                Selected: {formData.media.name} ({formatFileSize(formData.media.size)})
                            </p>
                            {mediaPreview && (
                                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-zinc-800">
                                    <Image src={mediaPreview} alt="Preview" className="w-full h-full object-cover" fill />
                                </div>
                            )}
                            {formData.media.type.startsWith("video/") && (
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
                        By filling out this form, I grant <strong className="text-white">Noah Lynch</strong> permission to use
                        photos and/or videos on social media platforms.
                    </label>
                </div>

                {error && (
                    <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium text-red-300 mb-1">Unable to submit check-in</p>
                                <p className="text-sm text-red-400">{error}</p>
                                <p className="text-xs text-red-500 mt-2">Please check your internet connection and try again.</p>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || isCompressing}
                    className={`
            w-full py-4 px-6 rounded-lg font-medium text-lg transition-all flex items-center justify-center gap-3 touch-manipulation min-h-[3rem]
            ${
                isSubmitting || isCompressing
                    ? "bg-zinc-600 cursor-not-allowed text-zinc-400"
                    : "bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-lg hover:shadow-xl active:scale-95 transform hover:-translate-y-0.5"
            }
          `}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting your check-in...
                        </>
                    ) : isCompressing ? (
                        <>
                            <Upload className="w-5 h-5 animate-pulse" />
                            Processing image...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            Share Your Experience ✨
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
