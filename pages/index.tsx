import Image from 'next/image';
import { Open_Sans } from 'next/font/google';
import backgroundImage from '../public/header-background.jpeg';
import profilePic from '../public/profile-pic.jpeg';

import { IoLogoGithub, IoMail } from 'react-icons/io5';
import { SiMedium } from 'react-icons/si';
import { RiLinkedinFill } from 'react-icons/ri';

import HeaderLink from './components/HeaderLink';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const openSans = Open_Sans({ subsets: ['latin'] });

export default function Home() {
  const [animationClass, setAnimationClass] = useState('max-h-0');
  const [animationClass2, setAnimationClass2] = useState('opacity-0');

  useEffect(() => {
    setTimeout(() => {
      setAnimationClass('max-h-96');
    }, 200);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAnimationClass2('opacity-100');
    }, 520);
  }, []);

  return (
    <div className={`${openSans.className}`}>
      <Head>
        <title>Pratheek Senevirathne</title>
      </Head>

      <header className='relative min-h-screen w-full'>
        <Image
          className='absolute top-0 left-0 -z-20 opacity-80'
          alt='Background Image'
          src={backgroundImage}
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'blur(3px)' }}
          fill
          priority
          placeholder='blur'
        />
        {/* Background Overlay */}
        <div className='absolute -z-10 top-0 left-0 bg-gradient-to-t from-black/75 to-black/20 h-full w-full'></div>

        <div className='relative min-h-screen'>
          <div className='absolute top-1/2 left-0 w-full -translate-y-1/2 p-5'>
            <div className='flex justify-center border-2 border-white rounded-full w-fit mx-auto'>
              <div className='relative'>
                <Image
                  height={120}
                  width={120}
                  alt='Profile Image'
                  src={profilePic}
                  className='rounded-full -z-10 brightness-75'
                  placeholder='blur'
                  priority
                />
                <div className='absolute top-0 left-0 h-[120px] w-[120px] bg-gradient-to-b from-black/30 to-transparent rounded-full'></div>
              </div>
            </div>

            <div className='h-12 border border-white w-0 mx-auto'></div>

            <div
              className={`border-t-2 border-b-2 border-white max-w-4xl mx-auto transition-all duration-1000 ${animationClass}`}
            >
              <div className={`py-12 transition-opacity duration-300 ${animationClass2}`}>
                <h1 className='text-4xl font-medium text-center mb-4'>Pratheek Senevirathne</h1>

                <h2 className='text-xl text-center'>
                  BSc. (Hons) Computer Science (Reading) | Entrepreneur | Robotics and Tech
                  Enthusiast | <br /> 3D Designer | Innovator
                </h2>
              </div>
            </div>

            <div className='flex justify-center my-8'>
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
      {/* <main className={`px-5 flex min-h-screen flex-col items-center justify-between`}></main> */}
    </div>
  );
}
