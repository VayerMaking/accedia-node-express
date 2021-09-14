const Pool = require('pg').Pool
const converter = require('csvtojson');
const validate = require('./validation.js');
const { Readable } = require('stream');

const pool = new Pool({
    user: 'accedia',
    host: 'localhost',
    database: 'accedia_node_express_db',
    password: 'accedia123',
    port: 5432,
})


const uploadFile = async (file, res) => {
    const stream = Readable.from(file.data.toString());
    const jsonArray = await converter().fromStream(stream);
    const data = file.data;

    validate(jsonArray);
    //console.log(validation);

    //const formattedJSONArray = JSON.stringify(jsonArray);
    //const parsedJSONArray = JSON.parse(formattedJSONArray);

    console.log("parsed array: ", jsonArray.length);
    jsonArray.forEach(element => {
        pool.query('INSERT INTO uploaded_files (username, indentifier, firstName, lastName) VALUES ($1, $2, $3, $4)', [element["Username"], element["Identifier"], element["FirstName"], element["LastName"]], (error, results) => {
            if (error) {
                throw error
            }
            //res.status(201).send(`Uploaded: ${results.insertId}`)
        })
    });

}

module.exports = { uploadFile, validate }