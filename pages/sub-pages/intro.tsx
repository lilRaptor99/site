import IntroLink from '@/components/IntroLink';
import OpenInNewLink from '@/components/OpenInNewLink';
import { MdOutlineOpenInNew } from 'react-icons/md';

export default function IntroPage() {
  return (
    <div>
      <div className='w-fit mb-6'>
        <h2 className='mb-1 text-2xl tracking-widest'>INTRO</h2>
        <div role='separator' className='border-b border-white w-full' />
      </div>

      <div className='mb-12'>
        <p className='text-justify'>
          Hello👋 Welcome to my corner of the Internet. <br />
          I&apos;m Pratheek Senevirathne, a Software Engineer @{' '}
          <IntroLink href='https://www.pagero.com/'>Pagero AB</IntroLink>. <br />
          I&apos;m a skilled software engineer and researcher with a strong academic foundation in
          core computer science principles, data structures, and algorithms. <br />
          I&apos;m also an entrepreneur: co-founded a 3D Printing company -{' '}
          <IntroLink href='https://www.lanka3dprinting.com'>Lanka 3D Printing</IntroLink>
        </p>
      </div>

      <div className='mb-12'>
        <h3 className='mb-6 text-xl tracking-widest'>EXPERIENCE</h3>

        <div className='relative w-full'>
          <div className='absolute top-0 left-0 h-full w-0.5 bg-white' />

          <div className='flex flex-col pl-[30px] py-6'>
            <div className='relative flex flex-col mb-8 bg-gray-400/20 p-4 rounded-xl'>
              <div className='absolute top-[10px] left-[-45px] bg-white h-8 w-8 rounded-full' />
              <h4 className='text-lg font-medium'>Software Engineer</h4>
              <OpenInNewLink href='https://www.pagero.com/' className='text-gray-300'>
                Pagero - Thomson Reuters
              </OpenInNewLink>

              <ul className='list-disc list-outside mb-2 pl-4 pt-1'>
                <li className='text-sm text-gray-400'>
                  Developing and maintaining 5 microservices written in Scala and Java, ensuring
                  scalability and performance
                </li>
                <li className='text-sm text-gray-400'>
                  Developing and Maintaining the Storage System (Amazon S3, Cassandra, PostgreSQL)
                  which handles over 10 million transactions per month, ensuring reliability and
                  availability
                </li>
              </ul>

              <p className='text-sm text-gray-400'>May 2024 - Present</p>
            </div>

            <div className='relative flex flex-col mb-8 bg-gray-400/20 p-4 rounded-xl'>
              <div className='absolute top-[10px] left-[-45px] bg-white h-8 w-8 rounded-full' />
              <h4 className='text-lg font-medium'>Co-Founder</h4>
              <OpenInNewLink href='https://lanka3dprinting.com' className='text-gray-300'>
                Lanka 3D Printing
              </OpenInNewLink>

              <ul className='list-disc list-inside mb-2'>
                <li className='text-sm text-gray-400'>
                  3D printing company specializing in FDM, SLA 3D Printing, and 3D designing
                </li>
                <li className='text-sm text-gray-400'>
                  Developed the website and invoicing platform{' '}
                </li>
              </ul>

              <p className='text-sm text-gray-400'>January 2019 - Present</p>
            </div>

            <div className='relative flex flex-col bg-gray-400/20 p-4 rounded-xl'>
              <div className='absolute top-[10px] left-[-45px] bg-white h-8 w-8 rounded-full' />
              <h4 className='text-lg font-medium'>Software Engineer Intern</h4>
              <OpenInNewLink href='https://wso2.com' className='text-gray-300'>
                WSO2
              </OpenInNewLink>

              <ul className='list-disc list-outside mb-2 pl-4 pt-1'>
                <li className='text-sm text-gray-400'>
                  Design and development of the &apos;Ballerina FHIR Repository Connector&apos;,
                  including asynchronous bulk export of health data.
                </li>
              </ul>

              <p className='text-sm text-gray-400'>November 2022 - April 2023</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-12'>
        <h3 className='mb-6 text-xl tracking-widest'>EDUCATION</h3>

        <div className='relative w-full'>
          <div className='flex flex-col pl-[30px]'>
            <div className='relative flex flex-col mb-6'>
              <div className='absolute top-[9px] left-[-35px] bg-white h-3 w-3 rounded-full' />
              <h4 className='text-lg font-medium'>BSc. (Hons) Computer Science</h4>
              <p className='text-gray-300 font-medium'>University of Colombo School of Computing</p>
              <p className='text-sm text-gray-400 mb-2'>CGPA: 3.8</p>
              <p className='text-sm text-gray-400'>2020 - 2024</p>
            </div>

            <div className='relative flex flex-col'>
              <div className='absolute top-[9px] left-[-35px] bg-white h-3 w-3 rounded-full' />
              <h4 className='text-lg font-medium'>G.C.E. Advanced Level (Physical Science)</h4>
              <p className='text-gray-300 font-medium'>Ananda College</p>
              <p className='text-sm text-gray-400 mb-2'>Z-score: 1.56</p>
              <p className='text-sm text-gray-400'>2016 - 2018</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-12'>
        <h3 className='mb-6 text-xl tracking-widest'>TECHNOLOGIES</h3>

        {/* languages sub section with language icons */}
        <div className='flex flex-wrap gap-4 justify-center'>
          {[
            'scala',
            'java',
            'js',
            'ts',
            'python',
            'c',
            'cpp',
            'php',
            // 'ballerina',
            // 'bash',
            'html',
            'css',
            'react',
            'nextjs',
            'tailwind',
            'mui',
            'nodejs',
            'spring',
            // 'flask',
            // 'express',
            'mysql',
            'postgresql',
            'mongodb',
            'redis',
            'git',
            'github',
            'docker',
            // 'aws',
            'azure',
            'gcd',
            'do',
            // 'netlify',
            // 'vercel',
            'firebase',
            // 'arduino',
            'figma',
          ].map((tech) => (
            <div
              key={tech}
              className='relative w-16 h-16 rounded-md overflow-hidden tech'
              title={tech}
            >
              <i
                aria-label={`${tech} icon`}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-300 transform scale-90 hover:scale-100 rounded-md ci ci-${tech}-light ci-2x`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
