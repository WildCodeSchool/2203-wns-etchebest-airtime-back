export const database = require('../config/db_config');

interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: number;
  password?: number;
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
  await database
    .promise()
    .query(
      `INSERT INTO user (id, firstname, lastname, email, password, role) VALUES (UUID(), ?, ?, ?, ?, ?)`,
      [firstname, lastname, email, password, role]
    );
  const res = await database
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email]);

  return res[0][0];
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
};
