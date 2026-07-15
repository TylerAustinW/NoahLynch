import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, forwardRef, type ReactNode } from "react";

const Spinner = ({ size = "default" }: { size?: "sm" | "default" | "lg" }) => (
  <svg
    className={cn(
      "animate-spin",
      size === "sm" && "h-3 w-3",
      size === "default" && "h-4 w-4",
      size === "lg" && "h-5 w-5",
    )}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-out disabled:pointer-events-none outline-none select-none",
  {
    variants: {
      variant: {
        primary: [
          "rounded-full border text-white backdrop-blur-sm font-medium",
          // Mobile styles
          "border-zinc-700/40 bg-zinc-900/80",
          "hover:bg-zinc-800/90 hover:border-zinc-600/50",
          // Desktop styles
          "lg:border-white/30 lg:bg-zinc-900/60",
          "lg:hover:bg-zinc-800/70 lg:hover:border-white/50",
          // Common styles
          "hover:backdrop-blur-md transition-all duration-300",
          "focus-visible:ring-2 focus-visible:ring-zinc-500/40 lg:focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "active:bg-zinc-800/95 lg:active:bg-zinc-800/80 disabled:opacity-50 disabled:transform-none",
        ],
        secondary: [
          "rounded-full border text-white backdrop-blur-md font-medium",
          // Mobile styles
          "border-zinc-700/40 bg-zinc-900/70",
          "hover:bg-zinc-800/80 hover:border-zinc-600/50",
          // Desktop styles
          "lg:border-white/20 lg:bg-zinc-900/90",
          "lg:hover:bg-zinc-800 lg:hover:border-white/40",
          // Common styles
          "transition-all duration-300",
          "focus-visible:ring-2 focus-visible:ring-zinc-500/40 lg:focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "active:bg-zinc-800/90 lg:active:bg-zinc-800 disabled:opacity-50 disabled:transform-none",
        ],
        ghost: [
          "rounded-lg text-zinc-300",
          "hover:bg-white/5 hover:text-white hover:backdrop-blur-sm",
          "focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1",
          "active:bg-white/10 disabled:opacity-50",
        ],
        outline: [
          "rounded-lg border border-zinc-700/60 bg-transparent text-zinc-300 shadow-sm",
          "hover:border-zinc-600 hover:bg-zinc-800/30 hover:text-white hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-zinc-400/40 focus-visible:ring-offset-1",
          "active:bg-zinc-800/50 disabled:opacity-50",
        ],
        link: [
          "text-amber-400 underline-offset-4 decoration-transparent transition-all",
          "hover:text-amber-300 hover:decoration-amber-300/50 hover:underline",
          "focus-visible:decoration-amber-300 focus-visible:underline focus-visible:outline-none",
          "active:text-amber-500 disabled:opacity-50",
        ],
        accent: [
          "rounded-full bg-gradient-to-r from-slate-600 to-slate-500 text-white shadow-lg shadow-black/25 border border-slate-500/50",
          "hover:from-slate-500 hover:to-slate-400 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 hover:border-slate-400/60",
          "focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "active:translate-y-0 active:shadow-lg disabled:opacity-60 disabled:shadow-none disabled:transform-none",
        ],
        destructive: [
          "rounded-lg bg-red-600 text-white shadow-lg shadow-red-600/20",
          "hover:bg-red-500 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5",
          "focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
          "active:translate-y-0 active:bg-red-700 disabled:opacity-60 disabled:transform-none",
        ],
      },

      size: {
        sm: "h-8 px-3 text-xs gap-1.5",
        default: "h-10 px-6 text-sm gap-2",
        lg: "h-12 px-8 text-base gap-2.5",
        xl: "h-14 px-10 text-lg gap-3",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0 text-xs",
        "icon-lg": "h-12 w-12 p-0 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const getSpinnerSize = (): "sm" | "lg" | "default" => {
      if (size === "sm" || size === "icon-sm") return "sm";
      if (size === "lg" || size === "xl" || size === "icon-lg") return "lg";
      return "default";
    };
    const spinnerSize = getSpinnerSize();

    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          disabled={isDisabled}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Spinner size={spinnerSize} />}
        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children && <span className={cn(loading && "opacity-70")}>{children}</span>}
        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
