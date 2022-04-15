const database = require('../config/db_config');

const findAllTickets = async () => {
  const result = await database
    .promise()
    .query(
      'SELECT id, title, comment, estimated_time, spent_time_minutes, status, BIN_TO_UUID(user_id) user_id, project_id FROM ticket'
    );
  return result[0];
};

module.exports = {
  findAllTickets,
};
