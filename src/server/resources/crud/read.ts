import express from 'express';
import dbConnection from '../../utils/db';
import { parseSqlResult } from '../../utils/sql.helpers';

const readErrorMsg = 'your Read Query did not use "SELECT"';

export const dbReadSync = (query = '', res: express.Response): void => {
  if (!query.includes('SELECT')) throw new Error(readErrorMsg);

  return dbConnection.query(
    query,
    /* eslint-disable */
    (err: Error, results: any) => {
      /* eslint-enable */
      if (err) {
        return res.send({ err });
      }

      return res.status(200).send({ data: results });
    }
  );
};

export const dbReadAsync = (query = '', params: any): Promise<any> => {
  if (!query.includes('SELECT')) throw new Error(readErrorMsg);

  return new Promise((resolve, reject) => {
    dbConnection.query(
      query,
      params,
      /* eslint-disable */
      (err: Error, results: any) => {
        /* eslint-enable */
        if (err) {
          return reject(err);
        }

        return resolve(parseSqlResult(results[0]));
      }
    );
  });
};
