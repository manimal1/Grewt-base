import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import 'module-alias/register';

import { config } from './config';
import { dbConnection, routesController } from './utils';

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

// use your routes that are set in the routes file
// separation of concerns keeps things neat and tidy here
routesController(app);

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
      console.log(`REST API on http://localhost:${port}/api`);
    });
  } catch (err) {
    console.log({ err });
  }
};
