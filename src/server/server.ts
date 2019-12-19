import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';

import { config } from './config';
import { dbConnection, setRoutes } from './utils';

const { json, urlencoded } = bodyParser;
const { port } = config;

const app = express();

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// set your ejs view engine to use the public html file
app.set('view engine', 'ejs');
app.set('views', 'public');
// have express use static files in the ./dist/client folder
// you don't need to specify ./dist since the index file is located there
app.use(express.static(path.join(__dirname, 'client')));

// set production build to load index file or client side routing
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });
} else {
  // webpack dev server handles client routing otherwise
  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('endpoint works!');
  });
}
// get and use routes set in the routes file
setRoutes(app);

export const start = async (): Promise<void> => {
  /* eslint-disable no-console */
  try {
    // connect mySQL database
    await dbConnection.connect((err: any) => {
      if (!err) {
        console.log('MySQL connection success!');
      } else {
        console.log(`MySQL connection fail \n Error: ${JSON.stringify(err, undefined, 2)}`);
      }
    });

    // launch express app
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}/`);
    });
  } catch (err) {
    console.log({ err });
  }
};
