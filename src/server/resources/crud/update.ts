import express from 'express';
import dbConnection from '../../utils/db';

const updateErrorMsg = 'your Update Query did not use "UPDATE"';

export const dbUpdateSync = (query = '', params: any, res: express.Response): void => {
  if (!query.includes('UPDATE')) throw new Error(updateErrorMsg);

  return dbConnection.query(query, params, (err: Error) => {
    if (err) {
      return res.send({ err });
    }

    return res.status(200);
  });
};

export const dbUpdateAsync = (
  query = '',
  params: any,
  res: express.Response,
  resolvedValue: any
): Promise<any> => {
  if (!query.includes('UPDATE')) throw new Error(updateErrorMsg);

  return new Promise((resolve, reject) => {
    dbConnection.query(query, params, (err: Error) => {
      if (err) {
        res.send({ err });
        return reject(err);
      }

      return resolve(resolvedValue);
    });
  });
};
