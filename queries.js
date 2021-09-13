const Pool = require('pg').Pool
const converter = require('csvtojson');

const pool = new Pool({
    user: 'accedia',
    host: 'localhost',
    database: 'accedia_node_express_db',
    password: 'accedia123',
    port: 5432,
})

const uploadFile = async (file, res) => {
    //const uploadedFile = req.files.uploadFile;
    //console.log(file.data.toString());
    // const parsedFile = CSVToJSON(filename, { parseNumbers: true });;
    const jsonArray = await converter().fromFile(file);
    // let result;
    // converter()
    //     .fromFile(file)
    //     .then((jsonObj) => {
    //         console.log(jsonObj);
    //         result = jsonObj
    //     })
    // console.log(result);
    //console.log("entered here");
    //console.log(parsedFile.toString());

    pool.query('INSERT INTO uploaded_files (file) VALUES ($1)', [jsonArray], (error, results) => {
        if (error) {
            throw error
        }
        //res.status(201).send(`Uploaded: ${results.insertId}`)
    })
}

module.exports = { uploadFile }