import database from '../config/db_config';
import { IProjectDataResult } from '../types/project.types';

interface IProject {
  id?: number;
  name?: string;
  description?: string;
  photography?: string;
  start_time?: string;
  end_time?: string;
}

const findAllProjects = async () => {
  const projectData = await database.promise().query('SELECT * FROM project');
  return projectData[0];
};

const createProject = async ({
  name,
  description,
  photography,
  start_time,
  end_time,
}: IProject) => {
  const projectCreated: any = await database
    .promise()
    .query(
      'INSERT INTO project (name, description, photography, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
      [name, description, photography, start_time, end_time]
    );

  const projectData: IProjectDataResult = await database
    .promise()
    .query('SELECT * FROM project WHERE id = ?', [
      projectCreated?.[0]?.insertId,
    ]);

  return projectData[0][0];
};

const deleteProject = async ({ id }: { id: number }) =>
  database.promise().query('DELETE FROM project WHERE id = ?', [id]);

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

  const projectData: IProjectDataResult = await database
    .promise()
    .query('SELECT * FROM project WHERE id = ?', [id]);

  return projectData[0][0];
};

module.exports = {
  findAllProjects,
  createProject,
  deleteProject,
  updateProject,
};
