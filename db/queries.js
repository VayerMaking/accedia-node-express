const Pool = require('pg').Pool
//const validate = require('./validation.js');
const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'accedia',
        password: 'accedia123',
        database: 'accedia_node_express_db'
    }
});

const uploadFile = async (jsonArray, res) => {
    console.log("parsed array: ", jsonArray);
    const chunkSize = 2;
    knex.batchInsert('uploaded_files', jsonArray, chunkSize);

}

module.exports = { uploadFile }