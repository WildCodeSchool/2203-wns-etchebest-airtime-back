const TicketModel = require('../models/ticket.model');

module.exports = {
  Query: {
    getAllTickets: async () => await TicketModel.findAllTickets(),
  },
};
