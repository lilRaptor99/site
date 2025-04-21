import Layout from '@/components/MinimalistLayout';
import { motion } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineExternalLink } from 'react-icons/hi';
import { SiGooglescholar, SiResearchgate } from 'react-icons/si';

interface Publication {
  title: string;
  authors: string;
  conference: string;
  year: string;
  link: string;
  abstract?: string;
  doi?: string;
}

const publications: Publication[] = [
  {
    title: 'Virtual Machine Proactive Fault Tolerance using Log-based Anomaly Detection',
    authors: 'Pratheek Senevirathne, Samindu Cooray, Jerome Dinal Herath, and Dinuni K. Fernando',
    conference: 'IEEE Access',
    year: '2024',
    link: 'https://ieeexplore.ieee.org/document/10767421',
    doi: '10.1109/ACCESS.2024.3506833',
    abstract:
      'This paper presents a novel approach for predictive identification of potential Virtual Machine failures due to hardware/software faults in real-time. We developed an anomaly detection system based on our improved Matrix Profile algorithm to enhance cloud reliability.',
  },
  // Can add more publications as they become available
];

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

export default function Publications() {
  return (
    <Layout title='Publications'>
      <div className='max-w-4xl'>
        <motion.h1
          className='heading'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Publications
        </motion.h1>

        <motion.p
          className='mb-12 text-muted'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My published academic work focuses on cloud computing optimization, particularly in the
          areas of virtual machine fault tolerance and anomaly detection.
        </motion.p>

        <motion.section
          className='mb-16'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.h2 variants={itemVariants} className='subheading'>
            Journal Articles
          </motion.h2>

          {publications.map((publication, index) => (
            <motion.div key={index} variants={itemVariants} className='card mb-8 group'>
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='font-semibold text-lg'>{publication.title}</h3>
                  <p className='mt-2 text-muted italic'>{publication.authors}</p>
                  <p className='mt-1 mb-4 text-sm text-muted'>
                    <span className='font-medium'>{publication.conference}</span>,{' '}
                    {publication.year}
                  </p>
                </div>
                <a
                  href={publication.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted hover:text-accent transition-colors flex-shrink-0 p-1'
                  aria-label={`View ${publication.title} on publisher site`}
                >
                  <HiOutlineDocumentText size={24} />
                </a>
              </div>

              {publication.abstract && (
                <div className='mt-2'>
                  <h4 className='text-sm font-medium mb-2'>Abstract</h4>
                  <p className='text-sm text-muted'>{publication.abstract}</p>
                </div>
              )}

              <div className='mt-6 pt-4 border-t border-border flex flex-wrap justify-between items-center'>
                {publication.doi && <p className='text-sm text-muted'>DOI: {publication.doi}</p>}
                <a
                  href={publication.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link text-sm flex items-center gap-1'
                >
                  View Publication <HiOutlineExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className='subheading'>
            Academic Profiles
          </motion.h2>

          <motion.div variants={itemVariants} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='card'>
              <div className='flex items-center gap-4'>
                <div className='p-4 rounded-full bg-card border border-border'>
                  <SiGooglescholar className='w-6 h-6 text-accent' />
                </div>
                <div>
                  <h3 className='font-medium'>Google Scholar</h3>
                  <p className='text-sm text-muted mt-1'>
                    View citation metrics and academic impact
                  </p>
                </div>
              </div>
              <div className='mt-6 text-right'>
                <a
                  href='https://scholar.google.com/citations?hl=en&user=kMqwoT0AAAAJ'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link text-sm inline-flex items-center gap-1'
                >
                  View Profile <HiOutlineExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className='card'>
              <div className='flex items-center gap-4'>
                <div className='p-4 rounded-full bg-card border border-border'>
                  <SiResearchgate className='w-6 h-6 text-accent' />
                </div>
                <div>
                  <h3 className='font-medium'>ResearchGate</h3>
                  <p className='text-sm text-muted mt-1'>
                    Access research papers and collaborations
                  </p>
                </div>
              </div>
              <div className='mt-6 text-right'>
                <a
                  href='https://www.researchgate.net/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link text-sm inline-flex items-center gap-1'
                >
                  View Profile <HiOutlineExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </Layout>
  );
}
