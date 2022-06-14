export const database = require('../config/db_config');

interface IProject {
  id?: number;
  name?: string;
  description?: string;
  photography?: string;
  start_time?: string;
  end_time?: string;
}

const findAllProjects = async () => {
  const result = await database.promise().query('SELECT * FROM project');
  return result[0];
};
const createProject = async ({
  name,
  description,
  photography,
  start_time,
  end_time,
}: IProject) => {
  const result: any = await database
    .promise()
    .query(
      'INSERT INTO project (name, description, photography, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
      [name, description, photography, start_time, end_time]
    );
  const res = await database
    .promise()
    .query('SELECT * FROM project WHERE id = ?', [result?.[0]?.insertId]);
  return res[0][0];
};

const deleteProject = async ({ id }: { id: number }) => {
  const result = await database
    .promise()
    .query('DELETE FROM project WHERE id = ?', [id]);
  return result;
};

const updateProject = async ({
  id,
  newAttributes,
}: {
  id: number;
  newAttributes: IProject;
}) => {
  await database
    .promise()
    .query('UPDATE project SET ? WHERE id = ?', [newAttributes, id]);
  const res = await database
    .promise()
    .query('SELECT * FROM project WHERE id = ?', [id]);
  return res[0][0];
};
module.exports = {
  findAllProjects,
  createProject,
  deleteProject,
  updateProject,
};
