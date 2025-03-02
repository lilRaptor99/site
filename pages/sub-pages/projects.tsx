import { MdOutlineOpenInNew } from 'react-icons/md';

export default function ProjectsPage() {
  return (
    <div>
      <div className='w-fit mb-8'>
        <h2 className='mb-1 text-2xl tracking-widest'>PROJECTS</h2>
        <div role='separator' className='border-b border-white w-full' />
      </div>

      <div className='flex flex-col justify-center gap-6 mb-8'>
        <ProjectCard
          title='Pagero: Document Storage, Archival, and Pushback'
          href='https://pageroonline.com'
          description='Developing and maintaining one of the key services in the Pagero business network, Document Storage, and other services such as Document API, Archival, and Pushback, ensuring reliability, performance, and availability.'
          technologies={[
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
          ]}
          timeString='December 2019 - Present'
        />
        <ProjectCard
          title='Lanka 3D Printing Site'
          href='https://lanka3dprinting.com'
          description='The official website, order management, quotation generation, and invoicing system of Lanka 3D Printing.'
          technologies={[
            'Next.js',
            'Javascript',
            'Typescript',
            'TailwindCSS',
            'Java',
            'Firebase',
            'Azure',
            'Oracle Cloud',
          ]}
          timeString='December 2019 - Present'
        />
        <ProjectCard
          title='Ballerina FHIR Repository Connector'
          href='https://central.ballerina.io/ballerinax/health.clients.fhir/2.0.0'
          description='The Ballerina Connector for a FHIR repository (FHIR is a healthcare information exchange standard.) Connects to any FHIR backend and performs all FHIR resource manipulation operations, including asynchronous bulk data export.'
          technologies={['Ballerina', 'Azure', 'HAPI FHIR', 'OAuth2']}
          timeString='November 2022 - April 2023'
        />
        <ProjectCard
          title='Railway Express'
          href='https://github.com/3rd-Year-Group-Project/railway-express'
          description='An All-in-one platform for Sri Lankan Railway ticketing and scheduling includes a mobile application for passengers and a web application for the railway staff.'
          technologies={[
            'Node.js',
            'TypeScript',
            'Tailwind CSS',
            'React.js',
            'React Native',
            'PostgreSQL',
            'Arduino',
            'GitHub Actions',
            'Azure',
          ]}
          timeString='May 2022 - October 2022'
        />
        <ProjectCard
          title='Fiction Times'
          href='https://github.com/Team-17-2YGP/fiction-times-backend'
          description='A subscription-based over-the-top platform, catering to both readers and writers as an easily consumable e-book service with an integrated e-book reader.'
          technologies={[
            'Java EE',
            'MySQL',
            'HTML5',
            'CSS3',
            'jQuery',
            'DigitalOcean',
            'GitHub Actions',
            'JavaScript',
          ]}
          timeString='May 2021 - April 2022'
        />
        <ProjectCard
          title='AuthZee'
          href='https://github.com/lilRaptor99/AuthZee'
          description='User authentication and authorization RESTful web service that uses JWT-like token to authorize users. Implemented using Java EE servlets.'
          technologies={['Java EE', 'JUnit']}
          timeString='June 2021 - July 2021'
        />
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  href,
  description,
  technologies,
  timeString,
}: {
  title: string;
  href: string;
  description: string;
  technologies: string[];
  timeString: string;
}) {
  return (
    <div className='bg-gray-400/20 p-4 rounded-2xl'>
      <a className='flex-1' href={href} target='_blank' rel='noopener noreferrer'>
        <h3 className='text-xl font-medium inline pr-1'>{title}</h3>
        <p className='inline-block text-gray-300 text-xs relative -right-0.5 -top-0.5'>
          <MdOutlineOpenInNew />
        </p>

        <p className='mb-3 text-xs text-gray-400'>{timeString}</p>

        <p className='mb-2 text-gray-200'>{description}</p>

        <p className='text-sm text-gray-400'>{technologies.join(', ')}</p>
      </a>
    </div>
  );
}
