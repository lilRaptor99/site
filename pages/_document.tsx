import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='robots' content='all' />
        <meta
          name='description'
          content='The official portfolio website of Pratheek Senevirathne'
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
