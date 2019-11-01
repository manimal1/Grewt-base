export interface UserModel {
  id?: number;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}

export const USER_QUERY = {
  CREATE: 'INSERT INTO users SET email = ?, password = ?, firstname = ?, lastname = ?',
  GET_ALL_NAMES: 'SELECT firstname, lastname FROM users',
  FIND_BY_ID: 'SELECT * FROM users where id=?',
  FIND_BY_EMAIL: 'SELECT * FROM users where email=?',
  CREATE_USER_TABLE: `
    CREATE TABLE NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(65) NOT NULL UNIQUE INDEX,
      password VARCHAR(45) NOT NULL,
      firstname VARCHAR(45) NULL,
      lastname VARCHAR(45) NULL,
    );
  `
};
