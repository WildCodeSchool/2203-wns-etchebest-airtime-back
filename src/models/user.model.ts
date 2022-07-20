const { hashPassword, generateToken } = require('../helpers/index');
import database from '../config/db_config';
import bcrypt from 'bcryptjs';


interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
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
  const res:any = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);

  return res[0][0];
};

const getUserByEmail = async ({ email }: { email: string }) => {
  const res:any = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);
  return res[0][0];
};

const deleteUser = async ({ id }: { id: string }) => {
  const res:any = await database
    .promise()
    .query('SELECT * FROM user WHERE id = ?', [id]);
  const resTicket:any = await database
    .promise()
    .query('SELECT * FROM ticket WHERE user_id = ?', [id]);
  if (resTicket[0].length) {
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

  const res:any = await database
    .promise()
    .query('SELECT * FROM user WHERE id = ?', [id]);
  return res[0][0];
};

const login = async ({ email, password }: IUser) => {
  const res:any = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);

  const user = res[0][0];
  if (!user) throw new Error('User not found');

  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) throw new Error('Identifiant incorrect');

  const token = generateToken(user.email, user?.id);
  return {
    ...user,
    token,
  };
};

module.exports = {
  findAllUsers,
  createUser,
  deleteUser,
  updateUser,
  login,
  getUserByEmail,
};
