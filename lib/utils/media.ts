export const MEDIA_TYPES = {
    IMAGE: {
        extensions: [".jpg", ".jpeg", ".png", ".webp"] as const,
        mimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const,
    },
    VIDEO: {
        extensions: [".mp4", ".webm", ".mov", ".m4v", ".avi"] as const,
        mimeTypes: [
            "video/mp4",
            "video/webm",
            "video/quicktime",
            "video/x-m4v", // iOS devices
            "video/3gpp", // Android 3GP
            "video/3gpp2", // Android 3G2
            "video/x-msvideo", // AVI files
        ] as const,
    },
} as const;

export function validateFileType(file: File, allowedTypes: "image" | "video" | ("image" | "video")[]): boolean {
    const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];

    // Handle empty or generic MIME types
    if (!file.type || file.type === "application/octet-stream") {
        const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
        for (const type of types) {
            const config = MEDIA_TYPES[type.toUpperCase() as keyof typeof MEDIA_TYPES];
            const extensions = config.extensions as readonly string[];
            if (extensions.includes(extension)) {
                return true;
            }
        }
    }

    for (const type of types) {
        const config = MEDIA_TYPES[type.toUpperCase() as keyof typeof MEDIA_TYPES];
        const mimeTypes = config.mimeTypes as readonly string[];
        if (mimeTypes.includes(file.type)) {
            return true;
        }

        const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
        const extensions = config.extensions as readonly string[];
        if (extensions.includes(extension)) {
            return true;
        }
    }

    return false;
}

export function validateFileSize(file: File, maxSizeInMB: number = 10): boolean {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
}

/**
 * Create image preview URL
 */
export function createImagePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!validateFileType(file, "image")) {
            reject(new Error("Invalid image file"));
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Compress image file
 */
export async function compressImage(
    file: File,
    maxWidth: number = 1920,
    maxHeight: number = 1080,
    quality: number = 0.8,
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (!ctx) {
                    reject(new Error("Could not get canvas context"));
                    return;
                }

                // Calculate new dimensions
                let { width, height } = img;

                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;

                    if (width > height) {
                        width = maxWidth;
                        height = width / aspectRatio;
                    } else {
                        height = maxHeight;
                        width = height * aspectRatio;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error("Compression failed"));
                        }
                    },
                    file.type,
                    quality,
                );
            };

            img.onerror = reject;
            img.src = e.target?.result as string;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
