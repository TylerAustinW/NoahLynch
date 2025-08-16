import Link from 'next/link';
import { Music } from 'lucide-react';
import { ROUTES } from '@/lib/config/constants';

interface CheckInButtonProps {
  className?: string;
  variant?: 'default' | 'floating' | 'inherit';
}

export default function CheckInButton({ className = '', variant = 'default' }: CheckInButtonProps) {
  const baseClasses =
    variant === 'inherit'
      ? 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
      : 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2';

  const variantClasses = {
    default:
      'px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105',
    floating:
      'fixed bottom-6 right-6 z-50 w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg hover:shadow-xl animate-pulse hover:animate-none transform hover:scale-110',
    inherit: '',
  };

  const iconSize = variant === 'floating' ? 'w-6 h-6' : 'w-5 h-5';
  const showText = variant !== 'floating';

  return (
    <Link
      href={ROUTES.CHECKIN}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      title="Check in to Noah's show"
    >
      <Music className={`${iconSize} ${showText ? 'mr-2' : ''}`} />
      {showText && "I'm at a Show!"}
    </Link>
  );
}
