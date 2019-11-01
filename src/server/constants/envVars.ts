import dotenv from 'dotenv';

dotenv.config();

export const EN_VARS = {
  DB_HOST_DEVELOPMENT: process.env.DB_HOST_DEVELOPMENT || '',
  DB_HOST_PRODUCTION: process.env.DB_HOST_PRODUCTION || '',
  DB_HOST_TESTING: process.env.DB_HOST_TESTING || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_USER_DEVELOPMENT: process.env.DB_USER_DEVELOPMENT || '',
  DB_USER_PRODUCTION: process.env.DB_USER_PRODUCTION || '',
  DB_USER_TESTING: process.env.DB_USER_TESTING || '',
  ENV: process.env.NODE_ENV || '',
  JWT: process.env.JWT || '',
  TEST_JWT: process.env.TEST_JWT || ''
};
