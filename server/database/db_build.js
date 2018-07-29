const path = require('path');
const { QueryFile } = require('pg-promise');
// var execsql = require('execsql'),
const db = require('./db_connection');
require('env2')('./.env');

const postrgeSqlBuildFile = './db_build.sql';
const mySqlBuildFile = '../db_build.sql';

let DB_URL;
let runDbBuild;


const sql = file => QueryFile(path.join(__dirname, file), { minify: true });

console.log('Using ',process.env.DB_ENGINE);

switch (process.env.DB_ENGINE) {
  case 'mysql': {
    const build = sql(mySqlBuildFile);

    // TODO : !!!

    console.log('Cannot process mySQL file with dbbuild yet. Use execsql -c "localhost" "user" "password" and execsql -f server/db_build.sql');
    console.log('(they may be located in node_modules/execsql/bin/ )\n');
    runDbBuild = () => {
      throw new Error ('Cannot process mySQL file with dbbuild yet. Use execsql -c "localhost" "user" "password" and execsql -f server/db_build.sql')
    };
    break;
  }
  case 'postgresql': {
    const build = sql(postrgeSqlBuildFile);
    runDbBuild = () =>
      db
        .query(build)
        .then(res => {
          console.log('db built');
          return 'db was built';
        })
        .catch(e => console.error('error', e));
    break;
    }
  default:
      console.log('Could not understand DB_ENGINE. Please set in so that I know which type of db connection to make');
}

//
// postgreSQL code - relies on pg-promise to process file
//
// const runDbBuild = () =>
//   db
//     .query(build)
//     .then(res => {
//       console.log('db built');
//       return 'db was built';
//     })
//     .catch(e => console.error('error', e));

module.exports = runDbBuild;
