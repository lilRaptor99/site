import Layout from '@/components/MinimalistLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineMail, HiOutlineCheck } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiGooglescholar, SiMedium, SiResearchgate } from 'react-icons/si';

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

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
}

function ContactCard({ icon, title, value, href }: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group bg-card/60 backdrop-blur-sm border border-border hover:border-accent p-4 rounded-lg flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1'
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className='p-3 rounded-full bg-card border border-border group-hover:border-accent group-hover:bg-accent/10 transition-colors'>
        {icon}
      </div>
      <div>
        <p className='text-muted text-sm'>{title}</p>
        <p className='font-medium'>{value}</p>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    submitting: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, submitting: true });

    // Simulate form submission
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
        submitted: true,
        submitting: false,
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
      submitted: false,
      submitting: false,
    });
  };

  return (
    <Layout title='Contact'>
      <div className='max-w-4xl'>
        <motion.h1
          className='heading'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.h1>

        <motion.p
          className='mb-12 text-muted'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Got a question or proposal, or just want to say hello? Feel free to reach out.
        </motion.p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <motion.div variants={containerVariants} initial='hidden' animate='visible'>
            <motion.h2 variants={itemVariants} className='subheading'>
              Send a Message
            </motion.h2>

            {formState.submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='card flex items-center p-8'
              >
                <div className='bg-accent/10 rounded-full p-4 mr-5'>
                  <HiOutlineCheck className='w-8 h-8 text-accent' />
                </div>
                <div>
                  <h3 className='font-medium text-lg mb-2'>Message sent!</h3>
                  <p className='text-muted'>
                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <button onClick={resetForm} className='mt-4 button-secondary'>
                    Send another message
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                variants={itemVariants}
                className='card space-y-6'
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor='name' className='block text-sm mb-2 font-medium'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={formState.name}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition duration-200'
                    placeholder='Your name'
                    required
                  />
                </div>

                <div>
                  <label htmlFor='email' className='block text-sm mb-2 font-medium'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={formState.email}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition duration-200'
                    placeholder='your.email@example.com'
                    required
                  />
                </div>

                <div>
                  <label htmlFor='subject' className='block text-sm mb-2 font-medium'>
                    Subject
                  </label>
                  <input
                    type='text'
                    name='subject'
                    id='subject'
                    value={formState.subject}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition duration-200'
                    placeholder='What is this regarding?'
                    required
                  />
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm mb-2 font-medium'>
                    Message
                  </label>
                  <textarea
                    name='message'
                    id='message'
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-md border border-border bg-background focus:ring-2 focus:ring-accent focus:border-accent outline-none transition duration-200'
                    placeholder='Your message here...'
                    required
                  ></textarea>
                </div>

                <div className='flex items-center gap-3'>
                  <button
                    type='submit'
                    disabled={formState.submitting}
                    className={`button-primary inline-flex items-center ${
                      formState.submitting ? 'opacity-80' : ''
                    }`}
                  >
                    {formState.submitting ? (
                      <>
                        <svg
                          className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <HiOutlineMail className='mr-2' />
                        Send Message
                      </>
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      setFormState({ ...formState, name: '', email: '', subject: '', message: '' })
                    }
                    className='button-secondary'
                  >
                    Reset
                  </button>
                </div>
              </motion.form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={containerVariants} initial='hidden' animate='visible'>
            <motion.h2 variants={itemVariants} className='subheading mb-6'>
              Contact Information
            </motion.h2>

            <motion.div
              className='grid grid-cols-1 gap-4'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
            >
              <ContactCard
                icon={<FiMail className='w-5 h-5 text-accent' />}
                title='Email'
                value='info@pratheeks.dev'
                href='mailto:info@pratheeks.dev'
              />

              <ContactCard
                icon={<FiLinkedin className='w-5 h-5 text-accent' />}
                title='LinkedIn'
                value='pratheek99'
                href='https://www.linkedin.com/in/pratheek99'
              />

              <ContactCard
                icon={<SiGooglescholar className='w-5 h-5 text-accent' />}
                title='Google Scholar'
                value='View Citations'
                href='https://scholar.google.com/citations?hl=en&user=kMqwoT0AAAAJ'
              />

              <ContactCard
                icon={<FiGithub className='w-5 h-5 text-accent' />}
                title='GitHub'
                value='lilRaptor99'
                href='https://github.com/lilRaptor99'
              />

              <ContactCard
                icon={<SiMedium className='w-5 h-5 text-accent' />}
                title='Medium'
                value='pratheeks'
                href='https://pratheeks.medium.com'
              />

              <ContactCard
                icon={<SiResearchgate className='w-5 h-5 text-accent' />}
                title='ResearchGate'
                value='View Profile'
                href='https://www.researchgate.net/profile/Pratheek-Senevirathne'
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
