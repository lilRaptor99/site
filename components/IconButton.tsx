interface HeaderLinkProps {
  href: string;
  icon: React.ReactNode;
}

export default function IconButton({ icon, href }: HeaderLinkProps) {
  return (
    <div className='w-fit h-fit rounded-full hover:bg-white/20 transition-colors'>
      <a href={href} target='_blank' aria-label={`Link to: ${href}`}>
        <div className='p-3 border border-white h-fit w-fit rounded-full'>
          <div className='text-xl h-fit w-fit'>{icon}</div>
        </div>
      </a>
    </div>
  );
}
