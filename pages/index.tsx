import HeaderLink from '@/components/HeaderLink';
import backgroundImage from '@/public/header-background.jpeg';
import profilePic from '@/public/profile-pic.jpeg';
import { Open_Sans } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Drawer } from 'vaul';
import ContactPage from './sub-pages/contact';
import IntroPage from './sub-pages/intro';
import ProjectsPage from './sub-pages/projects';

const openSans = Open_Sans({ subsets: ['latin'] });

enum SubPages {
  INTRO,
  PROJECTS,
  RESEARCH,
  CONTACT,
}

export default function Home() {
  const [headerHeightAnimationClass, setHeaderHeightAnimationClass] = useState('max-h-0');
  const [headerOpacityAnimationClass, setHeaderOpacityAnimationClass] = useState('opacity-0');
  const [subPage, setSubPage] = useState(SubPages.INTRO);

  useEffect(() => {
    setTimeout(() => {
      setHeaderHeightAnimationClass('max-h-96');
    }, 200);
    setTimeout(() => {
      setHeaderOpacityAnimationClass('opacity-100');
    }, 520);
  }, []);

  return (
    <div className={`${openSans.className}`}>
      <Drawer.Root>
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
          <div className='absolute -z-10 top-0 left-0 bg-gradient-to-t from-black/60 to-black/20 h-full w-full'></div>

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
                className={`border-t-2 border-b-2 border-white max-w-4xl mx-auto transition-all duration-1000 ${headerHeightAnimationClass}`}
              >
                <div
                  className={`py-12 transition-opacity duration-300 ${headerOpacityAnimationClass}`}
                >
                  <h1 className='text-4xl font-medium tracking-wide text-center mb-4'>
                    Pratheek Senevirathne
                  </h1>

                  <h2 className='text-xl text-center'>
                    Software Engineer @ Pagero | BSc. (Hons) Computer Science | <br />
                    Entrepreneur | Researcher | Innovator
                  </h2>
                </div>
              </div>

              <div className='h-12 border border-white w-0 mx-auto'></div>

              <div className='flex flex-col md:flex-row justify-center w-fit mx-auto'>
                <Drawer.Trigger>
                  <HeaderLink
                    title='INTRO'
                    className='rounded-t-md border-b-0 md:rounded-none md:border-2 md:border-r-0 md:rounded-l-md'
                    onClick={() => {
                      setSubPage(SubPages.INTRO);
                    }}
                  />
                </Drawer.Trigger>
                <Drawer.Trigger>
                  <HeaderLink
                    title='PROJECTS'
                    className='border-b-0 md:border-2 md:border-r'
                    onClick={() => {
                      setSubPage(SubPages.PROJECTS);
                    }}
                  />
                </Drawer.Trigger>
                <Drawer.Trigger>
                  <HeaderLink
                    title='RESEARCH'
                    className='border-b-0 md:border-2 md:border-l md:border-r-0'
                    onClick={() => {
                      setSubPage(SubPages.RESEARCH);
                    }}
                  />
                </Drawer.Trigger>
                <Drawer.Trigger>
                  <HeaderLink
                    title='CONTACT'
                    className='rounded-b-md md:rounded-none md:rounded-r-md'
                    onClick={() => {
                      setSubPage(SubPages.CONTACT);
                    }}
                  />
                </Drawer.Trigger>
              </div>

              <Drawer.Portal>
                <Drawer.Overlay className='fixed inset-0 bg-black/40' />
                <Drawer.Content className='backdrop-blur-md bg-black/80 flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] min-h-[96%] rounded-t-2xl border-t-2 border-t-gray-500/90'>
                  <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mt-2' />
                  <div className='text-2xl text-gray-300 ml-4'>
                    <Drawer.Close>
                      <IoArrowBackOutline />
                    </Drawer.Close>
                  </div>

                  <div className=' w-full flex flex-col overflow-auto p-4'>
                    <div className='max-w-xl w-full mx-auto'>
                      {(() => {
                        switch (subPage) {
                          case SubPages.INTRO:
                            return <IntroPage />;
                          case SubPages.PROJECTS:
                            return <ProjectsPage />;
                          case SubPages.RESEARCH:
                            return <h1>Research Page</h1>;
                          case SubPages.CONTACT:
                            return <ContactPage />;
                          default:
                            return <></>;
                        }
                      })()}
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </div>
          </div>
        </header>
      </Drawer.Root>
    </div>
  );
}
