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
      </Head>
      <body className='dark scroll-smooth'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
