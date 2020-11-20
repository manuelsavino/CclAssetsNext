import '../styles/app.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-gray-500 w-full p-10 min-h-screen'>
      <div className='max-w-6xl mx-auto'>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
