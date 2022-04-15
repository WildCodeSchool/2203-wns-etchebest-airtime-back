const { ApolloServer, gql } = require('apollo-server');
const userResolvers = require('./resolvers/user.resolver');
const ticketResolver = require('./resolvers/ticket.resolver');

const resolvers = [userResolvers, ticketResolver];

const typeDefs = gql`

  type User {
    id: String
    firstname: String
    lastname: String
    email: String
    password: String
    role: String
  }

  type Ticket {
    id: Int
    title: String
    comment: String
    estimated_time: Int
    spent_time_minutes: Int
    status: String
    user_id: String
    project_id: Int
  }

  type Query {
    getAllUsers: [User]
    getAllTickets: [Ticket]
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});
