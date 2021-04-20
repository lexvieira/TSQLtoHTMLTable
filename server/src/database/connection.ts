// import knex from 'knex';
import path from 'path';

const connection = require('knex')({
  client: 'mssql',
  connection: {
    host : '192.168.1.70',
    user : 'SA',
    password : 'JHu@hGTWSK@9t63',
    database : 'MY_DB'
  }
});

export default connection;
