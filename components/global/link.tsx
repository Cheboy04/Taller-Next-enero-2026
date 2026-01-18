import { cn } from '@/lib/tailwind';
import Link from 'next/link';

interface LinkProps {
  label: string;
  icon?: React.ReactNode;
  style: 'primary' | 'secondary';
  href: string;
  className?: string;
}

const CustomLink: React.FC<LinkProps> = ({ label, icon, style, href, className }) => {
  const classes = cn(
    'inline-flex items-center gap-1 text-sm font-medium transition-colors',
    {
      'text-slate-800 hover:text-slate-900 hover:underline': style === 'primary',
      'text-slate-white hover:text-slate-200 hover:underline': style === 'secondary',
    },
    className
  );

  return (
    <Link href={href} className={classes}>
      {icon && <span className="size-4">{icon}</span>}
      {label}
    </Link>
  );
};

export default CustomLink;
