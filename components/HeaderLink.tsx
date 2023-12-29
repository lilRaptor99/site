import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface HeaderLinkProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  className?: string;
}

export default function HeaderLink({ title, className, ...props }: HeaderLinkProps) {
  return (
    <div
      role='button'
      className={`w-32 h-fit hover:bg-white/20 transition-colors duration-300 border-2 cursor-pointer border-white text-center p-3 ${className}`}
      {...props}
    >
      <p className='tracking-widest'>{title}</p>
    </div>
  );
}
