import { EN_VARS } from '../constants';

const { DB_HOST_DEVELOPMENT, DB_USER_DEVELOPMENT, JWT } = EN_VARS;

export const config = {
  db: {
    host: DB_HOST_DEVELOPMENT,
    user: DB_USER_DEVELOPMENT
  },
  secrets: {
    jwt: JWT
  }
};
