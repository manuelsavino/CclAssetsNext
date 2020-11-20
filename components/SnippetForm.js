import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function SnippetForm({ snippet }) {
  const [previewSource, setPreviewSource] = useState();
  //TODO: configure react hook form
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      markupjs: snippet ? snippet.data.markupjs : '',
      css: snippet ? snippet.data.css : '',
      name: snippet ? snippet.data.name : '',
    },
  });
  const router = useRouter();

  const createSnippet = async (data) => {
    const { markupjs, css, name, image } = data;
    var reader = new FileReader();
    reader.readAsDataURL(image[0]);
    reader.onloadend = async () => {
      setPreviewSource(reader.result);
      try {
        await fetch('/api/createSnippet', {
          method: 'POST',
          body: JSON.stringify({
            markupjs,
            css,
            name,
            previewSource: reader.result,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        router.push('/');
      } catch (err) {
        console.error(err);
      }
    };
  };

  const updateSnippet = async (data) => {
    const { code, language, description, name } = data;
    const id = snippet.id;
    try {
      //TODO: updarte snippet
      await fetch('/api/updateSnippet', {
        method: 'PUT',
        body: JSON.stringify({ code, language, description, name, id }),
        headers: { 'Content-type': 'application/json' },
      });
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };
  //TODO: register inputs and add error messages
  return (
    //TODO: wrap with handleSubmit from react-hook-form
    <>
      <form onSubmit={handleSubmit(snippet ? updateSnippet : createSnippet)}>
        <div className='mb-4'>
          <label
            className='block text-red-100 text-sm font-bold mb-1'
            htmlFor='name'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            className='w-full border bg-white rounded px-3 py-2 outline-none text-gray-700'
            ref={register({ required: true })}
          />
          {errors.name && (
            <p className='font-bold text-red-900'>Name is Required</p>
          )}
        </div>
        {!snippet && (
          <div className='mb-4'>
            <label
              className='block text-red-100 text-sm font-bold mb-1'
              htmlFor='name'
            >
              Image
            </label>
            <input
              type='file'
              id='image'
              name='image'
              className='w-full border bg-white rounded px-3 py-2 outline-none text-gray-700'
              ref={register({ required: true })}
            />
            {errors.image && (
              <p className='font-bold text-red-900'>Image is Required</p>
            )}
          </div>
        )}

        <div className='mb-4'>
          <label
            className='block text-red-100 text-sm font-bold mb-1'
            htmlFor='description'
          >
            CSS
          </label>
          <textarea
            name='css'
            id='css'
            rows='3'
            className='resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
            placeholder='What does the snippet do?'
            ref={register()}
          ></textarea>
          {errors.description && (
            <p className='font-bold text-red-900'>Css is Required</p>
          )}
        </div>
        <div className='mb-4'>
          <label
            className='block text-red-100 text-sm font-bold mb-1'
            htmlFor='code'
          >
            Markup / JS
          </label>
          <textarea
            name='markupjs'
            id='markupjs'
            rows='10'
            className='resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
            placeholder="ex. console.log('helloworld')"
            ref={register({ required: true })}
          ></textarea>
          {errors.code && (
            <p className='font-bold text-red-900'>Markup / JS is Required</p>
          )}
        </div>
        <button
          className='bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
          type='submit'
        >
          Save
        </button>
        <Link href='/'>
          <a className='mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Cancel
          </a>
        </Link>
      </form>
      {previewSource && <img src={previewSource} />}
    </>
  );
}
