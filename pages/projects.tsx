import Layout from '@/components/MinimalistLayout';
import { motion } from 'framer-motion';
import { HiOutlineExternalLink } from 'react-icons/hi';
import Image from 'next/image';

interface ProjectProps {
  title: string;
  href: string;
  description: string;
  technologies: string[];
  timeString: string;
  image?: string;
}

const projects: ProjectProps[] = [
  {
    title: 'Pagero: Document Storage, Archival, and Pushback',
    href: 'https://pageroonline.com',
    description:
      'Developing and maintaining one of the key services in the Pagero business network, Document Storage, and other services such as Document API, Archival, and Pushback, ensuring reliability, performance, and availability.',
    technologies: [
      'Scala',
      'Java',
      'Spring',
      'Akka HTTP',
      'RabbitMQ',
      'Docker',
      'ProtoBuf',
      'Cassandra',
      'PostgreSQL',
      'Elastic Search',
      'S3',
    ],
    timeString: 'December 2019 - Present',
  },
  {
    title: 'Lanka 3D Printing Site',
    href: 'https://lanka3dprinting.com',
    description:
      'The official website, order management, quotation generation, and invoicing system of Lanka 3D Printing.',
    technologies: [
      'Next.js',
      'Javascript',
      'Typescript',
      'TailwindCSS',
      'Java',
      'Firebase',
      'Azure',
      'Oracle Cloud',
    ],
    timeString: 'December 2019 - Present',
  },
  {
    title: 'Ballerina FHIR Repository Connector',
    href: 'https://central.ballerina.io/ballerinax/health.clients.fhir/2.0.0',
    description:
      'The Ballerina Connector for a FHIR repository (FHIR is a healthcare information exchange standard.) Connects to any FHIR backend and performs all FHIR resource manipulation operations, including asynchronous bulk data export.',
    technologies: ['Ballerina', 'Azure', 'HAPI FHIR', 'OAuth2'],
    timeString: 'November 2022 - April 2023',
  },
  {
    title: 'Railway Express',
    href: 'https://github.com/3rd-Year-Group-Project/railway-express',
    description:
      'An All-in-one platform for Sri Lankan Railway ticketing and scheduling includes a mobile application for passengers and a web application for the railway staff.',
    technologies: [
      'Node.js',
      'TypeScript',
      'Tailwind CSS',
      'React.js',
      'React Native',
      'PostgreSQL',
      'Arduino',
      'GitHub Actions',
      'Azure',
    ],
    timeString: 'May 2022 - October 2022',
  },
  {
    title: 'Fiction Times',
    href: 'https://github.com/Team-17-2YGP/fiction-times-backend',
    description:
      'A subscription-based over-the-top platform, catering to both readers and writers as an easily consumable e-book service with an integrated e-book reader.',
    technologies: [
      'Java EE',
      'MySQL',
      'HTML5',
      'CSS3',
      'jQuery',
      'DigitalOcean',
      'GitHub Actions',
      'JavaScript',
    ],
    timeString: 'May 2021 - April 2022',
  },
  {
    title: 'AuthZee',
    href: 'https://github.com/lilRaptor99/AuthZee',
    description:
      'User authentication and authorization RESTful web service that uses JWT-like token to authorize users. Implemented using Java EE servlets.',
    technologies: ['Java EE', 'JUnit'],
    timeString: 'June 2021 - July 2021',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Projects() {
  return (
    <Layout title='Projects'>
      <div className='max-w-4xl'>
        <motion.h1
          className='heading'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h1>

        <motion.p
          className='mb-10 text-muted'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A collection of software projects I&apos;ve worked on spanning enterprise systems, web
          applications, and specialized libraries.
        </motion.p>

        <motion.div
          className='space-y-8'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}

function ProjectCard({ project, index }: { project: ProjectProps; index: number }) {
  const { title, href, description, technologies, timeString, image } = project;

  return (
    <motion.div variants={itemVariants} className='card group'>
      <div className='flex flex-col md:flex-row gap-6'>
        {image && (
          <div className='md:w-1/3'>
            <div className='relative h-48 md:h-full w-full overflow-hidden rounded'>
              <Image
                src={image}
                alt={title}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
            </div>
          </div>
        )}

        <div className={image ? 'md:w-2/3' : 'w-full'}>
          <div className='flex items-start justify-between'>
            <h3 className='font-medium text-lg'>{title}</h3>
            <a
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted hover:text-accent transition-colors flex-shrink-0 p-1'
              aria-label={`Visit ${title}`}
            >
              <HiOutlineExternalLink size={20} />
            </a>
          </div>

          <p className='text-sm text-muted mt-1 mb-3'>{timeString}</p>

          <p className='mb-4'>{description}</p>

          <div className='flex flex-wrap gap-2'>
            {technologies.map((tech, idx) => (
              <span key={idx} className='tag'>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
