import Head from 'next/head';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

type NavItem = {
  name: string;
  href: string;
};

const navItems: NavItem[] = [
  { name: 'About', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'Publications', href: '/publications' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function Layout({ children, title }: LayoutProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pageTitle = `${title ? `${title} | ` : ''}Pratheek Senevirathne`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content='Pratheek Senevirathne - Software Engineer & Researcher' />
      </Head>

      <div className='min-h-screen flex flex-col'>
        <header className='sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border'>
          <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
            <Link href='/' className='flex items-center gap-3 group'>
              <div className='relative w-8 h-8 overflow-hidden rounded-full'>
                <Image
                  src='/favicon.ico'
                  fill
                  alt='Pratheek Senevirathne'
                  className='object-cover transition-transform group-hover:scale-110'
                />
              </div>
              <span className='font-medium'>Pratheek Senevirathne</span>
            </Link>

            <nav className='hidden md:block'>
              <ul className='flex space-x-8'>
                {navItems.map((item) => {
                  const isActive =
                    router.pathname === item.href ||
                    (router.pathname.startsWith(item.href) && item.href !== '/');

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`relative py-1 transition-colors ${
                          isActive ? 'text-accent' : 'hover:text-accent'
                        }`}
                      >
                        {item.name}
                        {isActive && (
                          <motion.span
                            className='absolute -bottom-[17px] left-0 w-full h-0.5 bg-accent'
                            layoutId='navbar-indicator'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              className='md:hidden p-2'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
          </div>
        </header>

        {isMenuOpen && (
          <motion.div
            className='md:hidden fixed inset-0 z-20 bg-background pt-16'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className='container mx-auto px-4 py-8'>
              <ul className='space-y-6'>
                {navItems.map((item) => {
                  const isActive =
                    router.pathname === item.href ||
                    (router.pathname.startsWith(item.href) && item.href !== '/');

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`text-2xl font-medium ${isActive ? 'text-accent' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}

        <main className='flex-grow container mx-auto px-4 py-8 md:py-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>

        <footer className='border-t border-border'>
          <div className='container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted'>
            <p>© {new Date().getFullYear()} Pratheek Senevirathne</p>

            <div className='flex items-center space-x-4 mt-4 md:mt-0'>
              <a href='mailto:info@pratheeks.dev' className='hover:text-accent transition'>
                Email
              </a>
              <a
                href='https://www.linkedin.com/in/pratheek99'
                target='_blank'
                rel='noreferrer'
                className='hover:text-accent transition'
              >
                LinkedIn
              </a>
              <a
                href='https://www.github.com/lilRaptor99'
                target='_blank'
                rel='noreferrer'
                className='hover:text-accent transition'
              >
                GitHub
              </a>
              <a
                href='https://pratheeks.medium.com'
                target='_blank'
                rel='noreferrer'
                className='hover:text-accent transition'
              >
                Medium
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
