const ProjectModel = require('../models/project.model');

module.exports = {
  Query: {
    getAllProjects: async () => await ProjectModel.findAllProjects(),
  },
  Mutation: {
    createProject: async (_: any, args: any) => await ProjectModel.createProject(args),
    deleteProject: async (_: any, args: any) =>
      await ProjectModel.deleteProject(args),
    updateProject: async (_: any, args: any) =>
      await ProjectModel.updateProject({
        id: args.id,
        newAttributes: args,
      }),
  },
};
