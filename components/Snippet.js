import React from 'react';
import Code from './Code';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Snippet({ snippet }) {
  const router = useRouter();

  return (
    <div className='bg-gray-100 p-4 rounded-md my-2 shadow-lg box-border flex flex-col justify-between'>
      <div>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-xl text-gray-800 font-bold'>
            {snippet.data.name}
          </h2>
        </div>
        <img className='object-scale-down' src={snippet.data.previewSource} />
      </div>
      <Link href={`/view/${snippet.id}`}>
        <a className='mr-2 bg-purple-600 text-white rounded px-5 py-1 self-start'>
          View
        </a>
      </Link>
    </div>
  );
}
