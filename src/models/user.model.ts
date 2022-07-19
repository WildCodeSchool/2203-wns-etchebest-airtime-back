export const database = require('../config/db_config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const checkPassword = (password: string, hashedPassword: string): boolean =>
  bcrypt.compareSync(password, hashedPassword);

const generateToken = (userMail: string, userId: string) =>
  jwt.sign({ email: userMail, userId }, process.env.PRIVATE_KEY, {
    expiresIn: 86400,
  });

const checkToken = (token: string) =>
  jwt.verify(token, process.env.PRIVATE_KEY, (err: any, decoded: any) =>
    err
      ? {
          err: err?.message,
        }
      : decoded
  );

interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: string;
}

const findAllUsers = async () => {
  const result = await database.promise().query('SELECT * FROM user');
  return result[0];
};

const createUser = async ({
  firstname,
  lastname,
  email,
  password,
  role,
}: IUser) => {
  const hashedPassword = hashPassword(password as string);
  await database
    .promise()
    .query(
      `INSERT INTO user (id, firstname, lastname, email, password, role) VALUES (UUID(), ?, ?, ?, ?, ?)`,
      [firstname, lastname, email, hashedPassword, role]
    );
  const res = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);

  return res[0][0];
};

const getUserByEmail = async ({ email }: { email: string }) => {
  const res = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);
  return res[0][0];
};

const login = async ({ email, password }: IUser) => {
  const res = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);
  if (!res[0].length) {
    throw new Error('User not found');
  }
  const user = res[0][0];
  if (bcrypt.compare(password, user.password)) {
    return user;
  }
  throw new Error('Incorrect password');
};

const deleteUser = async ({ id }: { id: string }) => {
  const res = await database
    .promise()
    .query('SELECT * FROM user WHERE id = ?', [id]);
  const resTicket = await database
    .promise()
    .query('SELECT * FROM ticket WHERE user_id = ?', [id]);
  if (resTicket[0].length !== 0) {
    await database
      .promise()
      .query('UPDATE ticket SET user_id = null WHERE user_id = ?', [id]);
  }
  await database.promise().query('DELETE FROM user WHERE id = ?', [id]);

  return res[0][0];
};

const updateUser = async ({
  id,
  newAttributes,
}: {
  id: number;
  newAttributes: IUser;
}) => {
  await database
    .promise()
    .query('UPDATE user SET ? WHERE id = ?', [newAttributes, id]);

  const res = await database
    .promise()
    .query('SELECT * FROM user WHERE id = ?', [id]);
  return res[0][0];
};

module.exports = {
  findAllUsers,
  createUser,
  deleteUser,
  updateUser,
  login,
  checkPassword,
  getUserByEmail,
  generateToken,
  checkToken,
};
