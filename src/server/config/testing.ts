import { ServerEnvConfig } from './index';
import { EN_VARS } from '../constants';

const { DB_HOST_TESTING, DB_USER_TESTING, TEST_JWT } = EN_VARS;

export const config: ServerEnvConfig = {
  db: {
    host: DB_HOST_TESTING,
    user: DB_USER_TESTING
  },
  secrets: {
    jwt: TEST_JWT
  }
};
