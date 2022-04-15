const UserModel = require('../models/user.model');

module.exports = {
  Query: {
    getAllUsers: async () => await UserModel.findAllUsers(),
  },
};
