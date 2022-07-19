import { ApolloError } from 'apollo-server';

const UserModel = require('../models/user.model');

module.exports = {
  Query: {
    getAllUsers: async () => await UserModel.findAllUsers(),
  },
  Mutation: {
    createUser: async (_: any, args: any) => await UserModel.createUser(args),
    deleteUser: async (_: any, args: any) => await UserModel.deleteUser(args),
    updateUser: async (_: any, args: any) =>
      await UserModel.updateUser({
        id: args.id,
        newAttributes: args,
      }),
    signIn: async (_: any, { email, password }: any) => {
      try {
        const user = await UserModel.login({ email, password });
        if (user) {
          const checkPassword = await UserModel.checkPassword(
            password,
            user.password
          );
          if (checkPassword) {
            const token = await UserModel.generateToken(email, user?.id);
            return {
              ...user,
              token,
            };
          }
          throw new ApolloError('Identifiant incorrect');
        }
        return user;
      } catch (error: any) {
        return new ApolloError(`Server Error': ${error.message}`);
      }
    },
  },
};
