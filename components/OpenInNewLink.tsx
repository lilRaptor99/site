import { MdOutlineOpenInNew } from 'react-icons/md';

interface OpenInNewLinkProps {
  children?: React.ReactNode;
  href: string;
  className?: string;
}

export default function OpenInNewLink({ children, href, className }: OpenInNewLinkProps) {
  return (
    <div className={`inline-block relative ${className}`}>
      <a href={href} target='_blank' rel='noopener noreferrer' className='font-medium'>
        {children}
      </a>
      <p className='inline-block text-gray-300 text-xs relative -right-0.5 -top-0.5'>
        <MdOutlineOpenInNew />
      </p>
    </div>
  );
}
