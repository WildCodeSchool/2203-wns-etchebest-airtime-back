const UserModel = require('../models/user.model');

export const resolvers = {
  Query: {
    getAllUsers: async () => {
        console.log('je rentre')
        return await UserModel.getAllUsers()
    },
  },
};