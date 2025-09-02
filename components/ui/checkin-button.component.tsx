import Link from "next/link";
import { Music } from "lucide-react";
import { FEATURE_FLAGS, ROUTES } from "@/lib/config/constants";

interface CheckInButtonProps {
    className?: string;
    variant?: "default" | "floating" | "inherit";
}

export default function CheckInButton({ className = "", variant = "default" }: CheckInButtonProps) {
    if (!FEATURE_FLAGS.CHECKIN_ENABLED) {
        return null;
    }

    const baseClasses =
        variant === "inherit"
            ? "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            : "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2";

    const variantClasses = {
        default:
            "px-6 py-3 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 touch-manipulation",
        floating:
            "fixed bottom-6 right-6 z-50 w-14 h-14 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-full shadow-lg hover:shadow-xl active:shadow-2xl animate-pulse hover:animate-none transform hover:scale-110 active:scale-95 touch-manipulation",
        inherit: "touch-manipulation",
    };

    const iconSize = variant === "floating" ? "w-6 h-6" : "w-5 h-5";
    const showText = variant !== "floating";

    return (
        <Link
            href={ROUTES.CHECKIN}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            title="Check in to Noah's show"
        >
            <Music className={`${iconSize} ${showText ? "mr-2" : ""}`} />
            {showText && "I'm at a Show!"}
        </Link>
    );
}
