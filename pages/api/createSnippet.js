import { createSnippet } from '../../utils/Fauna';
// const cloudinary = require('cloudinary');

export default async function handler(req, res) {
  const { markupjs, css, name, previewSource } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
  try {
    const createdSnippet = await createSnippet(
      markupjs,
      css,
      name,
      previewSource
    );
    return res.status(200).json(createdSnippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
}
