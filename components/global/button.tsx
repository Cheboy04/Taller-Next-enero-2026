import { cn } from '@/lib/tailwind';
import Link from 'next/link';

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: 'primary' | 'secondary';
  size?: 'small' | 'large';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  iconPosition = 'left',
  style = 'secondary',
  size = 'large',
  href,
  type = 'button',
  onClick,
  disabled = false,
  className,
}) => {
  const classes = cn(
    'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-sans font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none',
    {
      'bg-slate-700 text-white hover:bg-slate-900': style === 'primary',
      'bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-900': style === 'secondary',
      'px-3 py-1.5 text-xs': size === 'small',
      'px-4 py-2 text-sm': size === 'large',
    },
    disabled && 'pointer-events-none cursor-not-allowed opacity-50',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon && iconPosition === 'left' && <span className="size-4">{icon}</span>}
        {label}
        {icon && iconPosition === 'right' && <span className="size-4">{icon}</span>}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {icon && iconPosition === 'left' && <span className="size-4">{icon}</span>}
      {label}
      {icon && iconPosition === 'right' && <span className="size-4">{icon}</span>}
    </button>
  );
};

export default Button;
