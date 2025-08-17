import { cn } from "@/lib/utils";
import type { ComponentBaseProps } from "@/lib/types";

interface GradientBackgroundProps extends ComponentBaseProps {
    variant?: "radial" | "linear" | "conic" | "mesh";
    color?: "primary" | "secondary" | "subtle";
    position?: "top" | "bottom" | "center" | "left" | "right";
    opacity?: number;
    blur?: boolean;
    fixed?: boolean;
}

export default function GradientBackground({
    variant = "radial",
    position = "center",
    opacity = 0.15,
    blur = true,
    fixed = false,
    className,
    style,
    ...props
}: GradientBackgroundProps) {
    const positions = {
        top: "top-0",
        bottom: "bottom-0",
        center: "top-1/2 -translate-y-1/2",
        left: "left-0",
        right: "right-0",
    };

    const getGradientStyle = () => {
        switch (variant) {
            case "radial":
                return {
                    background: `radial-gradient(circle at ${position}, rgba(251, 191, 36, ${opacity}), transparent 70%)`,
                };
            case "linear":
                return {
                    background: `linear-gradient(to bottom, rgba(251, 191, 36, ${opacity}), transparent)`,
                };
            case "conic":
                return {
                    background: `conic-gradient(from 180deg at 50% 50%, rgba(251, 191, 36, ${opacity}), transparent)`,
                };
            case "mesh":
                return {
                    background: `
            radial-gradient(at 20% 80%, rgba(251, 191, 36, ${opacity}) 0px, transparent 50%),
            radial-gradient(at 80% 20%, rgba(245, 158, 11, ${opacity * 0.8}) 0px, transparent 50%),
            radial-gradient(at 40% 40%, rgba(217, 119, 6, ${opacity * 0.6}) 0px, transparent 50%)
          `,
                };
            default:
                return {};
        }
    };

    return (
        <div
            className={cn(
                "pointer-events-none",
                fixed ? "fixed" : "absolute",
                "inset-0",
                positions[position],
                blur && "blur-3xl",
                className,
            )}
            style={{
                ...getGradientStyle(),
                ...style,
            }}
            aria-hidden="true"
            {...props}
        />
    );
}
