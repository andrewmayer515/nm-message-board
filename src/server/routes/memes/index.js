import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const getDankMemes = async (req, res) => {
  const { query } = req;
  const apiKey = process.env.giphyApiKey || process.env.giphyApiKey;

  const response = await fetch(
    `http://api.giphy.com/v1/gifs/search?q=${query.q}&api_key=${apiKey}&limit=${query.limit}&rating=R`
  );

  const body = await response.json();
  const results = body.data.map(data => {
    return data.images.original.url.split('?')[0];
  });
  res.send(results);
};

const getRandomMeme = async (req, res) => {
  const { query } = req;
  const apiKey = process.env.giphyApiKey || process.env.giphyApiKey;

  const response = await fetch(
    `http://api.giphy.com/v1/gifs/random?tag=${query.q}&api_key=${apiKey}&rating=R`
  );

  const body = await response.json();
  res.send([body.data.images.original.url.split('?')[0]]);
};

router.get('/dankmemes', getDankMemes);
router.get('/randomMeme', getRandomMeme);

export default router;
