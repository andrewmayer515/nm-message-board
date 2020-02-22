import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secret = 'secret';

const postCreateToken = async (req, res) => {
  const { body } = req;

  const token = jwt.sign(
    {
      username: body.username,
    },
    secret,
    { expiresIn: '7d' }
  );

  res.send({ token });
};

const postVerifyToken = async (req, res) => {
  const { body } = req;

  try {
    const decoded = jwt.verify(body.token, secret);

    res.send(decoded);
  } catch (err) {
    res.status(500).send('Token no longer valid');
  }
};

router.post('/api/createToken', postCreateToken);
router.post('/api/verifyToken', postVerifyToken);

export default router;
