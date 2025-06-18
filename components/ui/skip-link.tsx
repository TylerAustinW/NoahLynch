/**
 * Skip Link Component
 * Provides keyboard navigation shortcuts for accessibility
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useSkipLink } from '@/hooks/use-accessibility';

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const SkipLink = React.forwardRef<HTMLAnchorElement, SkipLinkProps>(
  ({ className, href, children, ...props }, ref) => {
    const { skipLinkRef, handleSkip } = useSkipLink();

    return (
      <a
        ref={ref || skipLinkRef}
        href={href}
        className={cn(
          // Hidden by default, visible on focus
          'sr-only focus:not-sr-only',
          // Positioning and styling when focused
          'absolute top-4 left-4 z-[9999]',
          'px-4 py-2 bg-amber-500 text-white',
          'rounded-md font-medium text-sm',
          'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
          'transition-all duration-200',
          className
        )}
        onClick={handleSkip}
        {...props}
      >
        {children}
      </a>
    );
  }
);

SkipLink.displayName = 'SkipLink';

/**
 * Skip Links Container Component
 * Container for multiple skip links
 */
export interface SkipLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  links: Array<{
    href: string;
    label: string;
  }>;
}

export const SkipLinks = React.forwardRef<HTMLDivElement, SkipLinksProps>(
  ({ className, links, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('sr-only focus-within:not-sr-only', className)}
        {...props}
      >
        <nav aria-label="Skip navigation links">
          <ul className="flex flex-col gap-2">
            {links.map((link, index) => (
              <li key={index}>
                <SkipLink href={link.href}>{link.label}</SkipLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
);

SkipLinks.displayName = 'SkipLinks';