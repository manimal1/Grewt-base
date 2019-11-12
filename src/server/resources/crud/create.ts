import express from 'express';
import dbConnection from '../../utils/db';

const createErrorMsg = 'your Create Query did not use "INSERT"';

export const dbCreateSync = (query = '', params: any, res: express.Response): void => {
  if (!query.includes('INSERT')) throw new Error(createErrorMsg);

  return dbConnection.query(
    query,
    params,
    /* eslint-disable */
    (err: Error, results: any) => {
      /* eslint-enable */
      if (err) {
        return res.send({ err });
      }
    }
  );
};

export const dbCreateAsync = (
  query = '',
  params: any,
  res: express.Response,
  resolvedValue: any
): Promise<any> => {
  if (!query.includes('INSERT')) throw new Error(createErrorMsg);

  return new Promise((resolve, reject) => {
    dbConnection.query(
      query,
      params,
      /* eslint-disable */
      (err: Error, results: any) => {
        /* eslint-enable */
        if (err) {
          res.send({ err });
          return reject(err);
        }

        return resolve(resolvedValue);
      }
    );
  });
};
