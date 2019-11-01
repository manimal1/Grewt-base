import mysql from 'mysql';
import { config } from '../config';

// set mySQL options here
const mysqlOptions = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name
};

// allow for new line breaks in promise chains by ignoring prettier
// prettier-ignore
const dbConnection: any = mysql.createConnection(mysqlOptions);

export default dbConnection;
