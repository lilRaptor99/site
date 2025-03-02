import IconButton from '@/components/IconButton';
import { IoLogoGithub, IoMail } from 'react-icons/io5';
import { RiLinkedinFill } from 'react-icons/ri';
import { SiMedium, SiGooglescholar } from 'react-icons/si';

export default function ContactPage() {
  return (
    <div>
      <div className='w-fit mb-8'>
        <h2 className='mb-1 text-2xl tracking-widest'>CONTACT</h2>
        <div role='separator' className='border-b border-white w-full' />
      </div>

      <form
        className='flex flex-wrap gap-4 mb-12'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          placeholder='Name'
          className='grow border border-gray-400 bg-transparent rounded-md p-2 pl-3 hover:border-white'
          required
        />
        <input
          placeholder='Email'
          type='email'
          className='grow border border-gray-400 bg-transparent rounded-md p-2 pl-3 hover:border-white'
          required
        />

        <textarea
          name='message'
          rows={6}
          placeholder='Message'
          className='w-full border border-gray-400 bg-transparent rounded-md p-2 pl-3 hover:border-white'
          required
        ></textarea>

        <button
          type='submit'
          className='bg-gray-200 text-black tracking-widest font-medium hover:bg-white transition-colors px-4 py-2 rounded-md'
        >
          SUBMIT
        </button>
        <button
          type='reset'
          className='border tracking-widest font-medium text-gray-200 border-gray-200 rounded-md hover:bg-white/20 transition-colors px-4 py-2'
        >
          {'RESET'}
        </button>
      </form>

      <div className='flex flex-wrap gap-4'>
        <IconButton href='mailto:info@pratheeks.dev' icon={<IoMail />} />
        <IconButton href='https://www.linkedin.com/in/pratheek99' icon={<RiLinkedinFill />} />
        <IconButton href='https://www.github.com/lilRaptor99' icon={<IoLogoGithub />} />
        <IconButton href='https://pratheeks.medium.com' icon={<SiMedium />} />
        <IconButton
          href='https://scholar.google.com/citations?hl=en&user=kMqwoT0AAAAJ'
          icon={<SiGooglescholar />}
        />
      </div>
    </div>
  );
}
