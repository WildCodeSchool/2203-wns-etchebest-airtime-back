import database from '../config/db_config';
import { IUserProjectDataResult } from '../types/userProject.types';

interface IUserProject {
  user_id: string;
  project_id: number;
}

const attributeProject = async ({
  user_id: userId,
  project_id: projectId,
}: IUserProject) =>
  await database
    .promise()
    .query(`INSERT INTO user_projects (user_id, project_id) VALUES (?, ?)`, [
      userId,
      projectId,
    ]);

const updateUserProject = async ({
  projectId,
  newAttributes,
}: {
  projectId: number;
  newAttributes: IUserProject;
}) => {
  await database
    .promise()
    .query(`UPDATE user_projects SET ? WHERE project_id = ?`, [
      newAttributes,
      projectId,
    ]);
    
  const userProjectData: IUserProjectDataResult = await database
    .promise()
    .query('SELECT * FROM user_projects WHERE project_id = ?', [projectId]);

  return userProjectData[0][0];
};

const deleteUserFromProject = async ({
  user_id: userId,
  project_id: projectId,
}: IUserProject) =>
  database
    .promise()
    .query(`DELETE FROM user_projects WHERE user_id = ? AND project_id = ?`, [
      userId,
      projectId,
    ]);

module.exports = {
  attributeProject,
  updateUserProject,
  deleteUserFromProject,
};
