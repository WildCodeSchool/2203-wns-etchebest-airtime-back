const UserProjectModel = require('../models/userProject.model');

module.exports = {
  Mutation: {
    attributeProject: async (_: any, args: any) =>
      await UserProjectModel.attributeProject(args),

    updateUserProject: async (_: any, args: any) => {
      await UserProjectModel.updateUserProject({
        projectId: args.project_id,
        newAttributes: args,
      });
    },

    deleteUserFromProject: async (_: any, args: any) => {
      await UserProjectModel.deleteUserFromProject(args);
    }
  },
};
