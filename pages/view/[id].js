import Head from 'next/head';
import { getSnippetById } from '../../utils/Fauna';
import { useRouter } from 'next/router';
import Code from '../../components/Code';
import Link from 'next/link';

export default function Home({ snippet }) {
  const router = useRouter();
  const deleteSnippet = async () => {
    try {
      await fetch('/api/deleteSnippet', {
        method: 'DELETE',
        body: JSON.stringify({ id: snippet.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Head>
        <title>Update Next Snippet</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-xlg mx-auto'>
        <Link href='/'>
          <button className='bg-purple-600 text-white rounded px-5 py-1 mb-5'>
            Go Back
          </button>
        </Link>
        <h1 className='text-white text-4xl mb-4'>{snippet.data.name}</h1>
        <img className='mb-5' src={snippet.data.image} />

        {snippet.data.css && <Code label='CSS' view code={snippet.data.css} />}
        <Code label='Markup / JS' view code={snippet.data.markupjs} />
        <Link href={`/edit/${snippet.id}`}>
          <a className='bg-green-600 text-white rounded px-5 py-2 mr-3'>Edit</a>
        </Link>
        <button
          onClick={deleteSnippet}
          className='bg-red-600 text-white rounded px-5 py-1'
        >
          Delete
        </button>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    //TODO: Get and return snippet as prop
    const id = context.params.id;
    const snippet = await getSnippetById(id);
    return {
      props: { snippet },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}
