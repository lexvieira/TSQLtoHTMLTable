import path from 'path';

module.exports = {
    client: 'mssql',
    connection: {
      host : '192.168.1.70',
      user : 'SA',
      password : 'JHu@hGTWSK@9t63',
      database : 'MY_DB'
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }, 
    useNullAsDefault: true,
};
