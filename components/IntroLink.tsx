import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IntroLinkProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  className?: string;
  href: string;
  children: string;
}

export default function IntroLink({ href, children, ...props }: IntroLinkProps) {
  return (
    <a
      href={href}
      className='relative w-fit inline-block font-medium after:block after:content-[""] after:absolute after:h-[1px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left'
      {...props}
    >
      {children}
    </a>
  );
}
