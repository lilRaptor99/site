import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='robots' content='all' />
        <meta
          name='description'
          content='The official portfolio of Pratheek Senevirathne, Computer Science Researcher and Software Engineer'
        />
        <meta name='author' content='Pratheek Senevirathne' />
        <meta
          name='keywords'
          content='Computer Science, Cloud Computing, Virtual Machine, Fault Tolerance, Anomaly Detection, Academic, Research'
        />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        <link
          href='https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
          rel='stylesheet'
        />

        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/dheereshagrwal/colored-icons@1.7.3/src/app/ci.min.css'
        />
      </Head>
      <body className='scroll-smooth'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
