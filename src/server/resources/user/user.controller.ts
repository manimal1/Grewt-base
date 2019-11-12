import express from 'express';
import bcrypt from 'bcrypt';

import { UserModel, USER_QUERY } from './user.model';
import { dbCreateAsync, dbReadSync, dbReadAsync } from '../../resources/crud';

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
  const query = USER_QUERY.FIND_BY_ID;
  const params = [userId];

  return dbReadAsync(query, params);
};

/**
 * @category USER
 */
export const getUserByEmail = (req: express.Request, res: express.Response): Promise<UserModel> => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'Please provide correct email' });
  }
  const query = USER_QUERY.FIND_BY_EMAIL;
  const params = [email];

  return dbReadAsync(query, params);
};

/**
 * @category USER
 */
export const getAllUserNames = (req: express.Request, res: express.Response): void => {
  return dbReadSync(USER_QUERY.GET_ALL_NAMES, res);
};

/**
 * @category USER
 */
export const createUser = async (
  req: express.Request,
  res: express.Response
): Promise<UserModel> => {
  const { password } = req.body;
  // hash password, which is retrieved and checked by protectedRoute in /utils/db.ts
  const passwordHash = await createHash(password);
  const user = {
    email: req.body.email,
    password: passwordHash,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };
  const query = USER_QUERY.CREATE;
  const params = [user.email, user.password, user.firstname, user.lastname];

  return dbCreateAsync(query, params, res, user);
};
