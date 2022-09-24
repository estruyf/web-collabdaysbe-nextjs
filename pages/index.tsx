import { readFileSync } from 'fs';
import Head from 'next/head'
import path from 'path';
import { Agenda } from '../components/Agenda';
import { Header } from '../components/Header'

function Home({ sessions }) {
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
      </Head>

      <Header />

      <Agenda agenda={sessions} />

      <footer className={`mx-auto w-full lg:max-w-7xl py-4 border-t border-gray-100 sticky top-[100vh]`}>
        <div className="mb-2 mx-auto text-center text-xs">
          <p>Hosted by</p>
        </div>

        <a href={`https://biwug.be`} title={`BIWUG`}>
          <img src="/assets/biwug.svg" className={`w-32 mx-auto`} alt={`BIWUG`} />
        </a>
      </footer>
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