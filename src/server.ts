const { ApolloServer, gql } = require('apollo-server');
const userResolvers = require('./resolvers/user.resolver');
const ticketResolver = require('./resolvers/ticket.resolver');
const projectResolver = require('./resolvers/project.resolver');

const resolvers = [userResolvers, ticketResolver, projectResolver];

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

  type Project {
    id: Int
    name: String
    description: String
    photography: String
    start_time: String
    end_time: String
  }

  type Query {
    getAllUsers: [User]
    getAllTickets: [Ticket]
    getAllProjects: [Project]
  }

  type Mutation {
    createUser(
      firstname: String
      lastname: String
      email: String
      password: String
      role: String
    ): User
    deleteUser(id: String): User
    updateUser(
      id: String
      firstname: String
      lastname: String
      email: String
      password: String
      role: String
    ): User
    createTicket(
      title: String
      comment: String
      estimated_time: Int
      spent_time_minutes: Int
      status: String
      user_id: String
      project_id: Int
    ): Ticket
    deleteTicket(id: Int): Ticket
    updateTicket(
      id: Int
      title: String
      comment: String
      estimated_time: Int
      spent_time_minutes: Int
      status: String
      user_id: String
      project_id: Int
    ): Ticket
    createProject(
      name: String
      description: String
      photography: String
      start_time: String
      end_time: String
    ): Project
    deleteProject(id: Int): Project
    updateProject(
      id: Int
      name: String
      description: String
      photography: String
      start_time: String
      end_time: String
    ): Project
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }: any) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
