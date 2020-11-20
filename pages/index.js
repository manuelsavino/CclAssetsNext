import Head from 'next/head';
import Snippet from '../components/Snippet';
import useSWR from 'swr';
import Link from 'next/link';
export default function Home() {
  const { data: snippets, mutate } = useSWR('/api/snippets');
  return (
    <div>
      <Head>
        <title>CCL Assets</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=''>
        <div className='my-12'>
          <h1 className='text-red-100 text-2xl'>Reusable Snippets</h1>
          <Link href='/new'>
            <a className='mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Create a Snippet!
            </a>
          </Link>
        </div>
        <div className='grid grid-cols-3 gap-5'>
          {snippets &&
            snippets.map((snippet) => (
              <Snippet key={snippet.id} snippet={snippet} />
            ))}
        </div>
      </main>
    </div>
  );
}
