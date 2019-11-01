import express from 'express';
import bcrypt from 'bcrypt';

import dbConnection from '../../utils/db';
import { parseSqlResult } from '../../utils/sql.helpers';
import { UserModel, USER_QUERY } from './user.model';

/**
 * @category HELPER
 */
const createHash = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, (err: any, hash: string) => {
      if (err) {
        return reject(err);
      }

      return resolve(hash);
    });
  });
};

/**
 * @category USER
 */
export const getUserById = (userId: number): Promise<UserModel> => {
  if (!userId) {
    console.log('please provide user ID!'); // eslint-disable-line
  }

  return new Promise((resolve, reject) => {
    dbConnection.query(
      USER_QUERY.FIND_BY_ID,
      [userId],
      /* eslint-disable */
      (err: Error, results: any, fields: any) => {
        /* eslint-enable */
        if (err) {
          return reject(err);
        }

        const user = results[0];
        return resolve(parseSqlResult(user));
      }
    );
  });
};

/**
 * @category USER
 */
export const getUserByEmail = (req: express.Request, res: express.Response): Promise<UserModel> => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'Please provide correct email and password' });
  }

  return new Promise((resolve, reject) => {
    dbConnection.query(
      USER_QUERY.FIND_BY_EMAIL,
      [email],
      /* eslint-disable */
      (err: Error, results: any, fields: any) => {
        /* eslint-enable */
        if (err) {
          res.send({ err });
          return reject(err);
        }

        return resolve(parseSqlResult(results[0]));
      }
    );
  });
};

/**
 * @category USER
 */
export const getAllUserNames = (req: express.Request, res: express.Response): void => {
  return dbConnection.query(
    USER_QUERY.GET_ALL_NAMES,
    /* eslint-disable */
    (err: Error, results: any, fields: any) => {
      /* eslint-enable */
      if (err) {
        return res.send({ err });
      }

      return res.status(200).send({ data: results });
    }
  );
};

/**
 * @category USER
 */
export const createUser = async (
  req: express.Request,
  res: express.Response
): Promise<UserModel> => {
  const { password } = req.body;
  const user = {
    email: req.body.email,
    password,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };

  // hash password, which is retrieved and checked by protectedRoute in /utils/db.ts
  const passwordHash = await createHash(password);
  user.password = passwordHash;

  return new Promise((resolve, reject) => {
    dbConnection.query(
      USER_QUERY.CREATE,
      [user.email, user.password, user.firstname, user.lastname],
      /* eslint-disable */
      (err: Error, results: any, fields: any) => {
        /* eslint-enable */
        if (err) {
          res.send({ err });
          return reject(err);
        }

        return resolve(user);
      }
    );
  });
};
