import { createSnippet } from '../../utils/Fauna';
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  const { markupjs, css, name, previewSource } = req.body;

  const res1 = await cloudinary.uploader.upload(previewSource, {
    upload_preset: 'dev_setup',
  });

  const image = await res1.secure_url;

  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
  try {
    const createdSnippet = await createSnippet(markupjs, css, name, image);
    return res.status(200).json(createdSnippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
}
