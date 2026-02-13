'use client';

import Link from 'next/link';

type ButtonVariant = 'primary' | 'outline' | 'white';

type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  external?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md active:bg-blue-800',
  outline:
    'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-700',
  white:
    'bg-white text-blue-600 hover:bg-blue-50 shadow-sm active:bg-blue-100',
};

const baseClasses =
  'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    if (href.startsWith('#')) {
      return (
        <a
          href={href}
          className={classes}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
