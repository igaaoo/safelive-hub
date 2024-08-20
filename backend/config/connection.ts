import oracledb from 'oracledb';
require('dotenv').config();
import { Pool } from 'pg';

//Conexão ao banco de dados
async function connect() {
  try {
    var connection = await oracledb.getConnection({
      //Informações para conexão ao banco
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE}`,
    });
  } catch (err: any) {
    return console.error(err.message);
  }

  return connection;
}

// Configuração da conexão ao PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST_PG,
  database: process.env.DB_BASE_PG,
  user: process.env.DB_USER_PG,
  password: process.env.DB_PASS_PG,
  port: 5432,
});

// Conexão ao banco de dados PostgreSQL
async function connectPostgres() {
  try {
    const client = await pool.connect();
    return client;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}

module.exports = {
  connect,
  connectPostgres
};
