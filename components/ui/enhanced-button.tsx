/**
 * Enhanced Button Component
 * Accessible, performant button with design system integration
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { designTokens } from '@/lib/design-tokens';
import { useReducedMotion } from '@/hooks/use-accessibility';

const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2',
    'rounded-lg border font-medium',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
    // Improved touch targets for mobile
    'min-h-[44px] min-w-[44px]',
    // Better text rendering
    'text-sm font-medium leading-none',
    // Prevent text selection
    'user-select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-amber-500 border-amber-500 text-white',
          'hover:bg-amber-600 hover:border-amber-600',
          'active:bg-amber-700 active:border-amber-700',
          'focus-visible:ring-amber-500/50',
          'dark:bg-amber-600 dark:border-amber-600',
          'dark:hover:bg-amber-700 dark:hover:border-amber-700',
        ],
        secondary: [
          'bg-sky-500 border-sky-500 text-white',
          'hover:bg-sky-600 hover:border-sky-600',
          'active:bg-sky-700 active:border-sky-700',
          'focus-visible:ring-sky-500/50',
          'dark:bg-sky-600 dark:border-sky-600',
          'dark:hover:bg-sky-700 dark:hover:border-sky-700',
        ],
        outline: [
          'border-zinc-300 bg-transparent text-zinc-900',
          'hover:bg-zinc-50 hover:border-zinc-400',
          'active:bg-zinc-100',
          'focus-visible:ring-zinc-500/50',
          'dark:border-zinc-700 dark:text-zinc-100',
          'dark:hover:bg-zinc-800 dark:hover:border-zinc-600',
          'dark:active:bg-zinc-700',
        ],
        ghost: [
          'border-transparent bg-transparent text-zinc-900',
          'hover:bg-zinc-100',
          'active:bg-zinc-200',
          'focus-visible:ring-zinc-500/50',
          'dark:text-zinc-100 dark:hover:bg-zinc-800',
          'dark:active:bg-zinc-700',
        ],
        destructive: [
          'bg-red-500 border-red-500 text-white',
          'hover:bg-red-600 hover:border-red-600',
          'active:bg-red-700 active:border-red-700',
          'focus-visible:ring-red-500/50',
          'dark:bg-red-600 dark:border-red-600',
          'dark:hover:bg-red-700 dark:hover:border-red-700',
        ],
        link: [
          'text-amber-600 underline-offset-4',
          'hover:underline hover:text-amber-700',
          'focus-visible:ring-amber-500/50',
          'dark:text-amber-400 dark:hover:text-amber-300',
          'border-transparent bg-transparent',
          'min-h-auto p-0',
        ],
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
        icon: 'h-10 w-10 p-0',
      },
      loading: {
        true: 'cursor-wait',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const prefersReducedMotion = useReducedMotion();
    
    const isDisabled = disabled || loading;
    
    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className={cn(
          'animate-spin h-4 w-4',
          prefersReducedMotion && 'animate-none'
        )}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-25"
        />
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          className="opacity-75"
        />
      </svg>
    );

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, loading, className }),
          prefersReducedMotion && 'transition-none'
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        
        <span className={cn(loading && loadingText && 'sr-only')}>
          {children}
        </span>
        
        {loading && loadingText && (
          <span className="ml-2">{loadingText}</span>
        )}
        
        {!loading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

/**
 * Icon Button Component
 * Specialized button for icon-only interactions
 */
export interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, size = 'icon', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn('shrink-0', className)}
        {...props}
      >
        <span aria-hidden="true">{icon}</span>
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

/**
 * Button Group Component
 * For grouping related buttons
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  spacing?: keyof typeof designTokens.spacing;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = 'horizontal', spacing = '2', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          `gap-${spacing}`,
          className
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';