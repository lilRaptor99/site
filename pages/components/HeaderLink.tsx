interface HeaderLinkProps {
  title: string;
  className?: string;
}

export default function HeaderLink({ title, className }: HeaderLinkProps) {
  return (
    <div
      className={`w-32 h-fit hover:bg-white/20 transition-colors duration-300 border-2 cursor-pointer border-white text-center p-3 ${className}`}
    >
      <p className=''>{title}</p>
    </div>
  );
}
