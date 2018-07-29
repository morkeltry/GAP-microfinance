const pgp = require('pg-promise')();
const mysql = require ('mysql');
const url = require('url');
require('env2')('./.env');

let DB_URL;

console.log('Using ',process.env.DB_ENGINE);

switch (process.env.DB_ENGINE) {
    case 'mysql':
        DB_URL = process.env.DATABASE_URL_MYSQL;
        break;
    case 'postgresql':
        DB_URL = process.env.DATABASE_URL_POSTGRESQL;
        break;
    default:
        console.log('Could not understand DB_ENGINE. Attempting DB_URL = DATABASE_URL');
         DB_URL = process.env.DATABASE_URL;
}

//set database url {local database}
let options;

if (!DB_URL) throw new Error('Enviroment variable DATABASE_URL must be set');

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(':');

options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password,
  ssl: params.hostname !== 'localhost'
};

switch (process.env.DB_ENGINE) {
  case 'mysql':
      module.exports = mysql.createConnection(options);
      break;
  case 'postgresql':
      module.exports = pgp(options);
      break;
  default:
        console.log('No database');
}
