const { ApolloServer, gql } = require('apollo-server');
const { UserResolver } = require('./resolvers/user.resolver');

const resolver = {
  resolvers: [UserResolver],
}

const typeDefs = gql`

  type User {
    id: String
    firstname: String
    lastname: String
    email: String
    password: String
    role: String
  }

  type Query {
    getAllUsers: [User]
  }
`;

console.log(UserResolver)

const server = new ApolloServer({ typeDefs, resolver });

server.listen().then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
