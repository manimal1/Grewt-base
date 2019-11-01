import { merge } from 'lodash';
import { Secret } from 'jsonwebtoken';
import { APP, EN_VARS } from '../constants';

const { DB_PASSWORD, ENV = 'development', JWT } = EN_VARS;
const { DEV, DEVELOPMENT, PRODUCTION, TEST, TESTING } = APP;

export interface ServerEnvConfig {
  secrets: {
    jwt: Secret;
  };
  db: {
    host: string;
    user: string;
  };
}

interface ServerConfig {
  ENV: string;
  isDev: boolean;
  isProd: boolean;
  isTest: boolean;
  port: number;
  secrets: {
    jwt: Secret;
    jwtExp: string;
  };
  db: {
    name: string | undefined;
    password: string | undefined;
    host?: string;
    user?: string;
  };
}

const baseConfig: ServerConfig = {
  ENV,
  isDev: ENV === DEVELOPMENT,
  isProd: ENV === PRODUCTION,
  isTest: ENV === TESTING,
  port: 5000,
  secrets: {
    jwt: JWT,
    jwtExp: '100d'
  },
  db: {
    name: 'db_grrewt',
    password: DB_PASSWORD
  }
};

/* eslint-disable */
let envConfig: any = {};

switch (ENV) {
  case PRODUCTION:
    envConfig = require('./prod').config;
    break;
  case DEV:
  case DEVELOPMENT:
    envConfig = require('./dev').config;
    break;
  case TEST:
  case TESTING:
    envConfig = require('./testing').config;
    break;
  default:
    envConfig = require('./dev').config;
}

export const config: ServerConfig = merge(baseConfig, envConfig);
