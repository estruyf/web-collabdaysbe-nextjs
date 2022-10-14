import { readFileSync } from 'fs';
import Head from 'next/head'
import { useRouter } from 'next/router';
import path from 'path';
import { useEffect, useState } from 'react';
import { Agenda } from '../components/Agenda';
import { Header } from '../components/Header'

function Home({ sessions }) {
  const [ zoom, setZoom ] = useState<number>(1);
  const [ timeslot, setTimeslot ] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (router.query.zoom) {
      const value = parseFloat(router.query.zoom as string);
      console.log('zoom', value);
      setZoom(value || 1);
    }
  }, [router.query.zoom]);

  useEffect(() => {
    if (router.query.timeslot) {
      let value = router.query.timeslot as string;
      if (value.includes(`"`)) {
        value = value.replace(/"/g, '');
      }
      setTimeslot(value);
    }
  }, [router.query.timeslot]);

  return (
    <div className={`bg-white min-h-screen`}>
      <Head>
        <title>CollabDays Belgium 2022 - Agenda</title>
        <meta name="description" content="Quick access to the agenda of CollabDays Belgium 2022" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />

        <style>
          {`
            html, body, #__next {
              font-size: ${zoom}rem;
            }
          `}
        </style>
      </Head>

      {
        zoom === 1 && (
          <Header />
        )
      }

      <Agenda agenda={sessions} timeslot={timeslot} zoom={zoom} />

      {
        zoom === 1 && (
          <footer className={`mx-auto w-full lg:max-w-7xl py-4 border-t border-gray-100 sticky top-[100vh]`}>
            <div className="mb-2 mx-auto text-center text-xs">
              <p>Hosted by</p>
            </div>

            <a href={`https://biwug.be`} title={`BIWUG`}>
              <img src="/assets/biwug.svg" className={`w-32 mx-auto`} alt={`BIWUG`} />
            </a>
          </footer>
        )
      }
    </div>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'sessions.json')
  const fileContents = readFileSync(filePath, 'utf8')

  return {
    props: {
      sessions: JSON.parse(fileContents)
    }
  };
}

export default Home;