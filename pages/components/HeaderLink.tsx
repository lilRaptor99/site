interface HeaderLinkProps {
  href: string;
  icon: React.ReactNode;
}

export default function HeaderLink({ icon, href }: HeaderLinkProps) {
  return (
    <div className='w-fit h-fit rounded-full hover:scale-90'>
      <a href={href} target='_blank'>
        <div className='p-3.5 border border-white h-fit w-fit rounded-full'>
          <div className='text-3xl h-fit w-fit'>{icon}</div>
        </div>
      </a>
    </div>
  );
}
