import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight, HiOutlineDocumentText } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import Layout from '@/components/MinimalistLayout';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Home() {
  return (
    <Layout title='Home'>
      <section className='max-w-4xl'>
        <motion.div
          className='mb-16 md:mb-24'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex flex-col md:flex-row md:items-center gap-8'>
            <div className='flex-1'>
              <div className='mb-4 inline-block'>
                <motion.div
                  className='relative overflow-hidden rounded-lg h-[300px] w-[300px]'
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Image
                    src='/cover-photo.jpg'
                    width={300}
                    height={300}
                    alt='Pratheek Senevirathne'
                    className='rounded-lg object-cover'
                    priority
                  />
                </motion.div>
              </div>

              <motion.h1
                className='text-3xl md:text-4xl font-bold leading-tight mb-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hi, I&apos;m Pratheek Senevirathne
              </motion.h1>

              <motion.p
                className='text-lg text-muted mb-6'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Software Engineer & Researcher
              </motion.p>

              <motion.p
                className='mb-6 leading-relaxed'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                I am a Software engineer and a researcher specializing in distributed systems.{' '}
                <br /> Currently working at{' '}
                <a
                  href='https://www.thomsonreuters.com/en'
                  target='_blank'
                  rel='noreferrer'
                  className='link'
                >
                  Thomson Reuters
                </a>
              </motion.p>

              <motion.div
                className='flex flex-wrap gap-4'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link href='/contact' className='button-primary flex items-center gap-2'>
                  Contact Me <HiArrowRight size={16} />
                </Link>
                <a
                  href='/Pratheek-Senevirathne-CV.pdf'
                  target='_blank'
                  className='button-secondary flex items-center gap-2'
                >
                  <HiOutlineDocumentText size={18} />
                  Resume
                </a>
              </motion.div>

              <motion.div
                className='flex items-center gap-4 mt-8'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <a
                  href='https://github.com/lilRaptor99'
                  target='_blank'
                  rel='noreferrer'
                  className='text-muted hover:text-accent transition-colors'
                  aria-label='GitHub'
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href='https://linkedin.com/in/pratheek99'
                  target='_blank'
                  rel='noreferrer'
                  className='text-muted hover:text-accent transition-colors'
                  aria-label='LinkedIn'
                >
                  <FiLinkedin size={20} />
                </a>
                <a
                  href='mailto:info@pratheeks.dev'
                  className='text-muted hover:text-accent transition-colors'
                  aria-label='Email'
                >
                  <FiMail size={20} />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.section
          className='mb-16'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2 variants={itemVariants} className='heading'>
            Experience
          </motion.h2>

          <div className='relative'>
            <div className='absolute left-0 md:left-1/5 w-0.5 bg-border h-full transform md:translate-x-2 hidden md:block'></div>

            {/* Pagero */}
            <motion.div variants={itemVariants} className='card mb-8 relative'>
              <div className='absolute -left-3 top-6 h-6 w-6 rounded-full bg-background border-2 border-accent z-10 hidden md:block'></div>
              <h3 className='font-semibold text-lg mb-4'>Pagero - Thomson Reuters</h3>
              <div className='ml-0 md:ml-8 space-y-6'>
                <div className='flex flex-col md:flex-row md:items-start gap-4 relative'>
                  <div className='absolute -left-6 top-2 h-3 w-3 rounded-full bg-accent z-10 hidden md:block'></div>
                  <div className='md:w-1/5'>
                    <span className='text-sm text-muted'>May 2024 - Present</span>
                  </div>
                  <div className='md:w-4/5'>
                    <h4 className='font-medium'>Software Engineer</h4>
                    <p className='mb-3'>
                      Developing and maintaining microservices for document storage, archival, and
                      APIs.
                    </p>
                    <ul className='list-disc list-inside text-sm text-muted space-y-1'>
                      <li>Building scalable microservices with Scala and Java</li>
                      <li>
                        Managing high-availability storage systems handling 10M+ monthly
                        transactions
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CloudNet Research Group */}
            <motion.div variants={itemVariants} className='card mb-8 relative'>
              <div className='absolute -left-3 top-6 h-6 w-6 rounded-full bg-background border-2 border-accent z-10 hidden md:block'></div>
              <h3 className='font-semibold text-lg mb-4'>
                CloudNet Research Group, University of Colombo School of Computing
              </h3>
              <div className='ml-0 md:ml-8 space-y-6'>
                <div className='flex flex-col md:flex-row md:items-start gap-4 relative'>
                  <div className='absolute -left-6 top-2 h-3 w-3 rounded-full bg-accent z-10 hidden md:block'></div>
                  <div className='md:w-1/5'>
                    <span className='text-sm text-muted'>June 2024 - Present</span>
                  </div>
                  <div className='md:w-4/5'>
                    <h4 className='font-medium'>Research Advisor</h4>
                    <p className='mb-3'>
                      Providing guidance and technical expertise on cloud computing and distributed
                      systems research.
                    </p>
                    <ul className='list-disc list-inside text-sm text-muted space-y-1'>
                      <li>Advising on research methodology and experiment design</li>
                      <li>Reviewing research papers and technical implementations</li>
                    </ul>
                  </div>
                </div>

                <div className='flex flex-col md:flex-row md:items-start gap-4 relative'>
                  <div className='absolute -left-6 top-2 h-3 w-3 rounded-full bg-accent z-10 hidden md:block'></div>
                  <div className='md:w-1/5'>
                    <span className='text-sm text-muted'>April 2023 - May 2024</span>
                  </div>
                  <div className='md:w-4/5'>
                    <h4 className='font-medium'>Researcher</h4>
                    <p className='mb-3'>
                      Conducted research on cloud computing, focusing on virtual machine fault
                      tolerance.
                    </p>
                    <ul className='list-disc list-inside text-sm text-muted space-y-1'>
                      <li>
                        Designed and developed a proactive fault tolerance system for virtual
                        machines
                      </li>
                      <li>Published research in IEEE Access journal (2024)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lanka 3D Printing */}
            <motion.div variants={itemVariants} className='card mb-8 relative'>
              <div className='absolute -left-3 top-6 h-6 w-6 rounded-full bg-background border-2 border-accent z-10 hidden md:block'></div>
              <h3 className='font-semibold text-lg mb-4'>Lanka 3D Printing</h3>
              <div className='ml-0 md:ml-8'>
                <div className='flex flex-col md:flex-row md:items-start gap-4 relative'>
                  <div className='absolute -left-6 top-2 h-3 w-3 rounded-full bg-accent z-10 hidden md:block'></div>
                  <div className='md:w-1/5'>
                    <span className='text-sm text-muted'>Jan 2019 - Present</span>
                  </div>
                  <div className='md:w-4/5'>
                    <h4 className='font-medium'>Co-Founder</h4>
                    <p className='mb-3'>
                      Leading a 3D printing company specializing in FDM, SLA printing and 3D design
                      services.
                    </p>
                    <ul className='list-disc list-inside text-sm text-muted space-y-1'>
                      <li>Developed the company website and order management system</li>
                      <li>Managing tech operations and client projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* WSO2 */}
            <motion.div variants={itemVariants} className='card relative'>
              <div className='absolute -left-3 top-6 h-6 w-6 rounded-full bg-background border-2 border-accent z-10 hidden md:block'></div>
              <h3 className='font-semibold text-lg mb-4'>WSO2</h3>
              <div className='ml-0 md:ml-8'>
                <div className='flex flex-col md:flex-row md:items-start gap-4 relative'>
                  <div className='absolute -left-6 top-2 h-3 w-3 rounded-full bg-accent z-10 hidden md:block'></div>
                  <div className='md:w-1/5'>
                    <span className='text-sm text-muted'>Nov 2022 - Apr 2023</span>
                  </div>
                  <div className='md:w-4/5'>
                    <h4 className='font-medium'>Software Engineer Intern</h4>
                    <p className='mb-3'>
                      Designed and implemented the Ballerina FHIR Repository Connector for
                      healthcare data exchange.
                    </p>
                    <ul className='list-disc list-inside text-sm text-muted space-y-1'>
                      <li>Implemented asynchronous bulk export operations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Education section */}
        <motion.section
          className='mb-16'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2 variants={itemVariants} className='heading'>
            Education
          </motion.h2>

          <motion.div variants={itemVariants} className='card mb-6'>
            <div className='flex flex-col md:flex-row md:items-start gap-4'>
              <div className='md:w-1/5'>
                <span className='text-sm text-muted'>2020 - 2024</span>
              </div>
              <div className='md:w-4/5'>
                <h3 className='font-medium text-lg'>BSc. Computer Science (First Class Honours)</h3>
                <p className='text-accent mb-2'>
                  University of Colombo School of Computing, Sri Lanka
                </p>
                <p className='text-sm'>CGPA: 3.8/4.0</p>
                <p className='text-sm text-muted'>
                  Research Focus: Cloud Computing, Virtualization, Anomaly Detection, Fault
                  Tolerance
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className='card'>
            <div className='flex flex-col md:flex-row md:items-start gap-4'>
              <div className='md:w-1/5'>
                <span className='text-sm text-muted'>2016 - 2018</span>
              </div>
              <div className='md:w-4/5'>
                <h3 className='font-medium text-lg'>G.C.E. Advanced Level (Physical Science)</h3>
                <p className='text-accent mb-2'>Ananda College, Sri Lanka</p>
                <p className='text-sm'>Z-score: 1.56</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Research & Projects preview */}
        <motion.section
          className='grid md:grid-cols-2 gap-8'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants}>
            <h2 className='heading'>Research</h2>
            <div className='card h-full'>
              <h3 className='font-medium text-lg mb-2'>Recent Research</h3>
              <p className='mb-4'>
                My research focuses on cloud computing, virtual machine fault tolerance, and anomaly
                detection.
              </p>
              <Link href='/research' className='link flex items-center gap-1'>
                View Research <HiArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className='heading'>Projects</h2>
            <div className='card h-full'>
              <h3 className='font-medium text-lg mb-2'>Featured Projects</h3>
              <p className='mb-4'>
                I&apos;ve worked on various projects spanning enterprise systems, web applications,
                and libraries.
              </p>
              <Link href='/projects' className='link flex items-center gap-1'>
                View Projects <HiArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </motion.section>
      </section>
    </Layout>
  );
}
