const db = require('../config/db_config');

const getAllUsers = async () => {
    const result = await db.promise().query("SELECT BIN_TO_UUID(id) id, firstname, lastname, email, password, role FROM user");
    return result[0];
}

module.exports = {
    getAllUsers
}