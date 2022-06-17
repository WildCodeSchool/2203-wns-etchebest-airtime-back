const TicketModel = require('../models/ticket.model');

module.exports = {
  Query: {
    getAllTickets: async () => await TicketModel.findAllTickets(),
  },
  Mutation: {
    createTicket: async (_: any, args: any) =>
      await TicketModel.createTicket(args),
    deleteTicket: async (_: any, args: any) =>
      await TicketModel.deleteTicket(args),
    updateTicket: async (_: any, args: any) =>
      await TicketModel.updateTicket({
        id: args.id,
        newAttributes: args,
      }),
  },
};
