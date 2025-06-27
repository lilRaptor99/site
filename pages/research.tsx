import Layout from '@/components/MinimalistLayout';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineExternalLink, HiOutlineDocumentText, HiArrowRight } from 'react-icons/hi';

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

export default function Research() {
  return (
    <Layout title='Research'>
      <div className='max-w-4xl'>
        <motion.h1
          className='heading'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Research
        </motion.h1>

        <motion.p
          className='mb-12 text-muted'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My research focuses on distributed systems, with special interest in virtual machine fault
          tolerance, anomaly detection in cloud computing environments, and cloud resource
          allocation optimization algorithms.
        </motion.p>

        <motion.section
          className='mb-16'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className='subheading'>
            Current Research Projects
          </motion.h2>

          <motion.div variants={itemVariants} className='card mb-8 group'>
            <div className='flex flex-col md:flex-row gap-6'>
              <div>
                <h3 className='font-semibold text-lg'>
                  Virtual Machine Placement for Live Gang Migrations in Cloud Environments
                </h3>
                <p className='text-sm text-muted mt-1 mb-4'>May 2025 - Present</p>
                <p className='mb-4'>
                  This research aims to find suitable destination hosts for live migration of
                  co-located Virtual Machines in cloud datacenters, which is proven to be an NP-Hard
                  problem. Existing work on VM Gang Migration assumes static destination mapping,
                  which is not suitable for dynamic cloud environments. The destination suitability
                  will be calculated considering multiple constraints such as, resource utilization,
                  migration bandwidth and SLA requirements.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className='card mb-8 group'>
            <div className='flex flex-col md:flex-row gap-6'>
              <div>
                <h3 className='font-semibold text-lg'>
                  Anomaly Detection in Containerized Environments
                </h3>
                <p className='text-sm text-muted mt-1 mb-4'>May 2025 - Present</p>
                <p className='mb-4'>
                  This study aims to identify anomalies within containerized environments, such as
                  Kubernetes, which generate extensive multivariate time series data, including logs
                  and resource metrics, to enhance system reliability and security. We aim to tackle
                  the unique challenges associated with anomaly detection in containers having an
                  ephemeral lifespan, such as the cold start problem, normality drift, and the
                  replication noise.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className='card mb-8 group'>
            <div className='flex flex-col md:flex-row gap-6'>
              <div>
                <h3 className='font-semibold text-lg'>
                  Optimal Destination Node Selection in Live Virtual Machine Migration
                </h3>
                <p className='text-sm text-muted mt-1 mb-4'>June 2024 - May 2025</p>
                <p className='mb-4'>
                  This research addresses the NP-Hard problem of finding optimal destination hosts
                  for Virtual Machines in Cloud Datacenters. By utilizing an Ant Colony Optimization
                  algorithm, we aim to develop a solution that efficiently places VMs while
                  considering multiple constraints including resource utilization, energy
                  efficiency, and SLA requirements.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className='card group'>
            <div className='flex flex-col md:flex-row gap-6'>
              <div>
                <h3 className='font-semibold text-lg'>
                  Virtual Machine Proactive Fault Tolerance using Log-based Anomaly Detection
                </h3>
                <p className='text-sm text-muted mt-1 mb-4'>March 2023 - April 2024</p>
                <p className='mb-4'>
                  This research focused on identifying potential Virtual Machine failures due to
                  hardware/software faults in real-time using an anomaly detection approach based on
                  our improved Matrix Profile algorithm. The system analyzes system logs to detect
                  patterns indicative of impending failures, allowing for proactive migration before
                  service disruption occurs.
                </p>
                <div className='flex flex-wrap gap-3'>
                  <Link href='/publications' className='link flex items-center gap-1'>
                    View Publication <HiArrowRight size={14} />
                  </Link>
                  <a
                    href='https://ieeexplore.ieee.org/document/10767421'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='link flex items-center gap-1'
                  >
                    IEEE Access Paper <HiOutlineExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* <motion.section
          className='mb-16'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className='subheading'>
            Publications
          </motion.h2>

          <motion.div variants={itemVariants} className='card'>
            <div className='flex items-start justify-between'>
              <div>
                <h3 className='font-semibold text-lg'>
                  Virtual Machine Proactive Fault Tolerance using Log-based Anomaly Detection
                </h3>
                <p className='mt-1 italic'>
                  <b>Pratheek Senevirathne</b>, Samindu Cooray, Jerome Dinal Herath, and Dinuni K.
                  Fernando
                </p>
                <p className='text-sm text-muted mt-1 mb-3'>IEEE Access (2024)</p>
                <p className='mb-4'>
                  This paper presents VMFT-LAD, a semi-supervised real-time log anomaly detection
                  model that combines our modified Matrix Profile algorithm with Large Language
                  Models to enable proactive virtual machine fault tolerance in cloud computing
                  environments. We demonstrate that our approach achieves exceptional performance
                  with a 96.28% early detection rate and minimal false positives, allowing for
                  timely VM migration before failures occur without requiring labeled failure data.
                </p>
                <p className='text-sm text-muted'>DOI: 10.1109/ACCESS.2024.3506833</p>
              </div>
              <a
                href='https://ieeexplore.ieee.org/document/10767421'
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted hover:text-accent transition-colors flex-shrink-0 p-1'
                aria-label='View publication on IEEE'
              >
                <HiOutlineDocumentText size={24} />
              </a>
            </div>

            <div className='mt-6 pt-6 border-t border-border'>
              <a
                href='https://scholar.google.com/citations?hl=en&user=kMqwoT0AAAAJ'
                target='_blank'
                rel='noopener noreferrer'
                className='link flex items-center gap-1'
              >
                View Google Scholar Profile <HiOutlineExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </motion.section> */}
      </div>
    </Layout>
  );
}
