import bcrypt from 'bcryptjs';
import { IUserDataResult } from '../types/user.types';
import { ITicketDataResult } from '../types/ticket.types';
import database from '../config/db_config';
import { generateToken, hashPassword } from '../helpers';

interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  role?: string;
}

const findAllUsers = async () => {
  const userData = await database.promise().query('SELECT * FROM user');
  return userData[0];
};

const createUser = async ({ firstname, lastname, email, password }: IUser) => {
  const hashedPassword = hashPassword(password as string);
  await database
    .promise()
    .query(
      `INSERT INTO user (id, firstname, lastname, email, password) VALUES (UUID(), ?, ?, ?, ?)`,
      [firstname, lastname, email, hashedPassword]
    );
  const userData: IUserDataResult = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);

  return userData[0][0];
};

const getUserByEmail = async ({ email }: { email: string }) => {
  const userData: IUserDataResult = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);
  return userData[0][0];
};

const deleteUser = async ({ id }: { id: string }) => {
  const userData: IUserDataResult = await database
    .promise()
    .query('SELECT * FROM user WHERE id = ?', [id]);

  const ticketData: ITicketDataResult = await database
    .promise()
    .query('SELECT * FROM ticket WHERE user_id = ?', [id]);

  if (ticketData[0].length)
    await database
      .promise()
      .query('UPDATE ticket SET user_id = null WHERE user_id = ?', [id]);

  await database.promise().query('DELETE FROM user WHERE id = ?', [id]);

  return userData[0][0];
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

  const userData: IUserDataResult = await database
    .promise()
    .query('SELECT * FROM user WHERE id = ?', [id]);

  return userData[0][0];
};

const login = async ({ email, password }: IUser) => {
  const userData: IUserDataResult = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);

  const user = userData[0][0];

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
