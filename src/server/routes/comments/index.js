import express from 'express';

const router = express.Router();

const getComments = async (req, res) => {
  const { db } = req.app.locals;
  const collection = db.collection('messages');
  const comments = await collection.find({}).toArray();

  res.send({ comments });
};

const postComments = async (req, res) => {
  const { body } = req;
  const { db } = req.app.locals;
  const collection = db.collection('messages');
  await collection.insertOne({ text: body.text, username: body.username });

  res.send({});
};

router.get('/api/comments', getComments);
router.post('/api/comments', postComments);

export default router;
