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
                  Optimal Destination Node Selection in Live Virtual Machine Migration
                </h3>
                <p className='text-sm text-muted mt-1 mb-4'>June 2024 - Present</p>
                <p className='mb-4'>
                  This research addresses the NP-Hard problem of finding optimal destination hosts
                  for Virtual Machines in Cloud Datacenters. By utilizing an Ant Colony Optimization
                  algorithm, we aim to develop a solution that efficiently places VMs while
                  considering multiple constraints including resource utilization, energy
                  efficiency, and SLA requirements.
                </p>

                <div className='grid md:grid-cols-2 gap-4 mb-3'>
                  <div>
                    <h4 className='text-sm font-medium mb-2'>Key Research Questions</h4>
                    <ul className='list-disc list-inside text-sm text-muted space-y-1 pl-1'>
                      <li>VM placement optimization for efficient resource utilization</li>
                      <li>Effective heuristics for ant colony optimization algorithm</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium mb-2'>Methodologies</h4>
                    <ul className='list-disc list-inside text-sm text-muted space-y-1 pl-1'>
                      <li>Ant Colony Optimization</li>
                      <li>CloudSim Plus simulations</li>
                      <li>Statistical performance analysis</li>
                    </ul>
                  </div>
                </div>
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

        <motion.section
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
        </motion.section>

        {/* <motion.section
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className='subheading'>
            Research Methodology
          </motion.h2>

          <motion.div variants={itemVariants} className='card'>
            <p className='mb-8'>
              My research approach combines theoretical analysis with practical implementation and
              empirical evaluation. I follow a structured methodology that typically includes the
              following phases:
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div>
                <div className='h-1 w-12 bg-accent mb-4'></div>
                <h3 className='font-medium mb-4'>Problem Definition</h3>
                <ul className='space-y-2 text-muted'>
                  <li className='flex items-start gap-2'>
                    <span className='text-accent'>→</span>
                    <span>Literature review and gap analysis</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-accent'>→</span>
                    <span>Research question formulation</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-accent'>→</span>
                    <span>Objective definition and scoping</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className='h-1 w-12 bg-accent mb-4'></div>
                <h3 className='font-medium mb-4'>Approach Development</h3>
                <ul className='space-y-2 text-muted'>
                  <li className='flex items-start gap-2'>
                    <span className='text-accent'>→</span>
                    <span>Algorithm design and theoretical validation</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-accent'>→</span>
                    <span>System architecture planning</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-accent'>→</span>
                    <span>Mathematical modeling and analysis</span>
                  </li>
                </ul>
              </div>

              <div>
                <div className='h-1 w-12 bg-accent mb-4'></div>
                <h3 className='font-medium mb-4'>Evaluation</h3>
                <ul className='space-y-2 text-muted'>
                  <li className='flex items-start gap-2'>
                    <span className='text-accent'>→</span>
                    <span>Implementation and prototype development</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-accent'>→</span>
                    <span>Empirical testing and data collection</span>
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='text-accent'>→</span>
                    <span>Comparative analysis and validation</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.section> */}
      </div>
    </Layout>
  );
}
