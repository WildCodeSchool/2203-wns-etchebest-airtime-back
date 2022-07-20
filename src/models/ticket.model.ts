import database from '../config/db_config';

interface ITicket {
  id?: number;
  title?: string;
  comment?: string;
  estimated_time?: number;
  spent_time_minutes?: number;
  status?: string;
  user_id?: string;
  project_id?: number;
}

const findAllTickets = async () => {
  const result = await database.promise().query('SELECT * FROM ticket');
  return result[0];
};

const createTicket = async ({
  title,
  comment,
  estimated_time,
  spent_time_minutes,
  status,
  user_id,
  project_id,
}: ITicket) => {
  const result: any = await database
    .promise()
    .query(
      'INSERT INTO ticket (title, comment, estimated_time, spent_time_minutes, status, user_id, project_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        title,
        comment,
        estimated_time,
        spent_time_minutes,
        status,
        user_id,
        project_id,
      ]
    );
  const res:any = await database
    .promise()
    .query('SELECT * FROM ticket WHERE id = ?', [result?.[0]?.insertId]);
  return res[0][0];
};

const deleteTicket = async ({ id }: { id: number }) => {
  const result = await database
    .promise()
    .query('DELETE FROM ticket WHERE id = ?', [id]);
  return result;
};

const updateTicket = async ({
  id,
  newAttributes,
}: {
  id: number;
  newAttributes: ITicket;
}) => {
  await database
    .promise()
    .query('UPDATE ticket SET ? WHERE id = ?', [newAttributes, id]);

  const res:any = await database
    .promise()
    .query('SELECT * FROM ticket WHERE id = ?', [id]);
  return res[0][0];
};

module.exports = {
  findAllTickets,
  createTicket,
  deleteTicket,
  updateTicket,
};
