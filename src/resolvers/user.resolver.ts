const UserModel = require('../models/user.model');

module.exports = {
  Query: {
    getAllUsers: async () => await UserModel.findAllUsers(),
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      return await UserModel.createUser(args);
    },
    deleteUser: async (_: any, args: any) => {
      return await UserModel.deleteUser(args);
    },
    updateUser: async (_: any, args: any) => {
      return await UserModel.updateUser({
        id: args.id,
        newAttributes: args,
      });
    },
  },
};
