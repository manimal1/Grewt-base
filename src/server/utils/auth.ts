import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { UserModel } from '../resources/user/user.model';

import { config } from '../config';
import { createUser, getUserById, getUserByEmail } from '../resources/user/user.controller';

interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export const newToken = (user: UserModel): string => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = (token: string): Promise<TokenPayload> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err: Error, payload: any) => {
      if (err) {
        return reject(err);
      }

      return resolve(payload);
    });
  });

export const protectedRoute = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();

  try {
    const payload = await verifyToken(token);
    const user = await getUserById(payload.id);
    if (!user) {
      return res.status(401).end();
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
};

export const checkPassword = (password: string, passwordHash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err: Error, res: boolean): void => {
      if (err) {
        return reject(err);
      }

      return resolve(res);
    });
  });
};

export const signup = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' });
  }

  try {
    const user = await createUser(req, res);
    const token = newToken(user);
    return res.status(201).send({ token, user });
  } catch (err) {
    return res.status(500).end();
  }
};

export const signin = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'need email and password' });
  }

  const invalid = { message: 'Invalid email and passoword combination' };

  try {
    const user = await getUserByEmail(req, res);
    if (!user) {
      return res.status(401).send(invalid);
    }

    const dbPasswordHash = user.password || '';
    const match = await checkPassword(password, dbPasswordHash);
    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res.status(201).send({ token, user });
  } catch (err) {
    return res.status(500).end();
  }
};
