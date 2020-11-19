import React, { useState } from 'react';

export default function Code({ view, label, code }) {
  const [copyText, setCopyText] = useState('Copy');
  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopyText('✅ Copied!');
    setTimeout(() => {
      setCopyText('Copy');
    }, 1000);
  };
  return (
    <div className='my-5'>
      <h3 className='text-white text-2xl py-3'>{label}</h3>
      <div className='relative'>
        <pre className='text-gray-800 bg-gray-300 rounded-md p-2'>
          <code>{code}</code>
        </pre>
        <button
          className='bg-gray-500 text-xs hover:bg-gray-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2 absolute top-0 right-0 transform -translate-x-1 translate-y-1'
          type='submit'
          onClick={copyCode}
        >
          {copyText}
        </button>
      </div>
    </div>
  );
}
