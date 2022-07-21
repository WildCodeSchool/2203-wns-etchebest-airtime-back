import { ApolloError } from 'apollo-server';

const UserModel = require('../models/user.model');

module.exports = {
  Query: {
    getAllUsers: async () => await UserModel.findAllUsers(),
  },
  Mutation: {
    createUser: async (_: any, args: any) => await UserModel.createUser(args),

    deleteUser: async (_: any, args: any, context: any) => {
      if (!context.user) return new ApolloError('You must be authenticated');
      return UserModel.deleteUser(args);
    },

    updateUser: async (_: any, args: any, context: any) => {
      if (!context.user) return new ApolloError('You must be authenticated');
      return UserModel.updateUser({
        id: args.id,
        newAttributes: args,
      });
    },

    signIn: async (_: any, args: any) => {
      try {
        const user = await UserModel.login(args);
        return user;
      } catch (error: any) {
        return new ApolloError(error.message);
      }
    },

    signUp: async (_: any, args: any) => {
      const existingUser = await UserModel.getUserByEmail(args.email);
      if (existingUser) throw new ApolloError('Email already exists');
      try {
        const newUser = await UserModel.createUser(args);
        return await UserModel.login({ ...newUser, password: args.password });
      } catch (error: any) {
        return new ApolloError(`Server Error': ${error.message}`);
      }
    },
  },
};
