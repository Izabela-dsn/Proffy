import knex from 'knex';
import path from 'path';

//Configurando conexão com o banco sqlite
//migrations: controlam a versão do banco de dados

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    //especifico para sqlite, campo nulo como padrão
    useNullAsDefault: true,
});

export default db;