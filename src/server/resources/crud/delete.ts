import express from 'express';
import dbConnection from '../../utils/db';

const deleteErrorMsg = 'your Delete Query did not use "DELETE"';

export const dbDeleteSync = (query = '', params: any, res: express.Response): void => {
  if (!query.includes('DELETE')) throw new Error(deleteErrorMsg);

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

export const dbDeleteAsync = (query = '', params: any, res: express.Response): Promise<any> => {
  if (!query.includes('DELETE')) throw new Error(deleteErrorMsg);

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

        res.status(200);
        return resolve();
      }
    );
  });
};
