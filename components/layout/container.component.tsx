import { cn } from "@/lib/utils";
import type { ComponentBaseProps, WithChildren } from "@/lib/types";

interface ContainerProps extends ComponentBaseProps, WithChildren {
	as?: "div" | "section" | "article" | "main";
	size?: "sm" | "md" | "lg" | "xl" | "full";
	gutter?: boolean;
	centered?: boolean;
}

export default function Container({
	as: Component = "div",
	size = "lg",
	gutter = true,
	centered = true,
	className,
	children,
	...props
}: ContainerProps) {
	const sizeClasses = {
		sm: "max-w-3xl",
		md: "max-w-5xl",
		lg: "max-w-7xl",
		xl: "max-w-[1536px]",
		full: "max-w-full",
	};

	return (
		<Component
			className={cn(sizeClasses[size], centered && "mx-auto", gutter && "px-4 sm:px-6 lg:px-8", "w-full", className)}
			{...props}
		>
			{children}
		</Component>
	);
}
