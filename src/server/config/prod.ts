import { EN_VARS } from '../constants';

const { DB_HOST_PRODUCTION, DB_USER_PRODUCTION, JWT } = EN_VARS;

export const config = {
  db: {
    host: DB_HOST_PRODUCTION,
    user: DB_USER_PRODUCTION
  },
  secrets: {
    jwt: JWT
  }
};
