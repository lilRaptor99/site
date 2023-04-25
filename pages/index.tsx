import Image from 'next/image';
import { Open_Sans } from 'next/font/google';
import backgroundImage from '../public/header-background.jpeg';
import profilePic from '../public/profile-pic.jpeg';

import { IoLogoGithub, IoMail } from 'react-icons/io5';
import { SiMedium } from 'react-icons/si';
import { RiLinkedinFill } from 'react-icons/ri';

import HeaderLink from './components/HeaderLink';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`${openSans.className}`}>
      <header className='relative min-h-screen w-full'>
        <Image
          className='absolute top-0 left-0 -z-20 opacity-80'
          alt='Background Image'
          src={backgroundImage}
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'blur(1px)' }}
          fill
          priority
          placeholder='blur'
        />
        {/* Background Overlay */}
        <div className='absolute -z-10 top-0 left-0 bg-gradient-to-t from-black/75 to-black/20 h-full w-full'></div>

        <div className='px-5 grid place-content-center min-h-screen'>
          <div>
            <div className='flex justify-center mb-5'>
              <div className='relative'>
                <Image
                  height={200}
                  width={200}
                  alt='Profile Image'
                  src={profilePic}
                  className='rounded-full -z-10 brightness-75'
                  placeholder='blur'
                  priority
                />
                <div className='absolute top-0 left-0 h-[200px] w-[200px] bg-gradient-to-b from-black/40 to-transparent rounded-full'></div>
              </div>
            </div>

            <h1 className='text-4xl font-bold text-center mb-4'>Pratheek Senevirathne</h1>

            <h2 className='text-2xl text-center mb-8 max-w-[60ch]'>
              BSc. (Hons) Computer Science (Reading) | Intern SE @ WSO2 | Entrepreneur | Robotics
              and Tech Enthusiast | 3D Designer | Innovator
            </h2>

            <div className='flex justify-center mb-8'>
              <div className='w-8 h-0.5 bg-white rounded-full'></div>
            </div>

            <div className='flex flex-wrap gap-4 justify-center'>
              <HeaderLink href='mailto:pratheeksenevirathne@gmail.com' icon={<IoMail />} />
              <HeaderLink href='https://www.linkedin.com/in/pratheek99' icon={<RiLinkedinFill />} />
              <HeaderLink href='https://www.github.com/lilRaptor99' icon={<IoLogoGithub />} />
              <HeaderLink href='https://pratheeks.medium.com' icon={<SiMedium />} />
            </div>
          </div>
        </div>
      </header>
      <main className={`px-5 flex min-h-screen flex-col items-center justify-between p-24`}>
        {/* <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'>
          <a
            href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app'
            className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            target='_blank'
            rel='noopener noreferrer'
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docs{' '}
              <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </a>
        </div> */}
      </main>
    </div>
  );
}
