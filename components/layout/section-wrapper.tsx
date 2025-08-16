import { cn } from '@/lib/utils';
import type { ComponentBaseProps, WithChildren } from '@/lib/types';

interface SectionWrapperProps extends ComponentBaseProps, WithChildren {
  as?: 'section' | 'div' | 'article' | 'main';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'secondary' | 'tertiary' | 'gradient' | 'transparent';
  container?: boolean;
  centered?: boolean;
}

export default function SectionWrapper({
  as: Component = 'section',
  size = 'lg',
  spacing = 'lg',
  background = 'default',
  container = true,
  centered = false,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  // Size classes
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1536px]',
    full: 'w-full',
  };

  const spacingClasses = {
    none: '',
    sm: 'py-8 px-4',
    md: 'py-12 px-6',
    lg: 'py-16 px-4 lg:px-8',
    xl: 'py-20 px-4 lg:px-8 xl:px-12',
  };

  const backgroundClasses = {
    default: 'bg-zinc-950',
    secondary: 'bg-zinc-900',
    tertiary: 'bg-zinc-800',
    gradient: 'bg-gradient-to-b from-zinc-950 to-zinc-900',
    transparent: 'bg-transparent',
  };

  return (
    <Component
      className={cn(backgroundClasses[background], spacingClasses[spacing], className)}
      {...props}
    >
      {container ? (
        <div className={cn(sizeClasses[size], centered && 'mx-auto', 'w-full')}>{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}
