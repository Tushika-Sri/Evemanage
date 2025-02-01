const pool = require('../../services/database/mysql');
const Boom = require('@hapi/boom');



const createStatus = async (pk_client_id, name, description) => {
  /**
   * Sample implementation of Database query
   * 
  const [result] = await pool.query(
    'INSERT INTO status (name, description, fk_client_id) VALUES (?, ?, ?)',
    [name, description, pk_client_id]
  );
  if (result.affectedRows === 0) {
    throw Boom.badRequest('Failed to create status');
  }
  return { id: result.insertId, name, description };
   */

  return {name, description};
};

const getStatus = async (name) => {
  /**
   * Sample implementation of Database query
   * 
  const [broadcasters] = await pool.query(
    'SELECT * FROM status WHERE name = ?',
    [name]
  );
  return broadcasters;
  */

  return {status:true, message:"Server is up and running"};
};

module.exports = {
  createStatus,
  getStatus
};
