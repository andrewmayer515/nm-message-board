import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import comments from './routes/comments';
import jwt from './routes/jwt';
import memes from './routes/memes';

dotenv.config();

const app = express();

const dbName = 'message_board';
const client = new MongoClient(process.env.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

app.use(bodyParser.json());

// Routes
app
  .use(comments)
  .use(jwt)
  .use(memes);

const port = process.env.PORT || 5000;

client.connect(() => {
  app.locals.db = client.db(dbName);
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on port ${port}`);
  });
});
