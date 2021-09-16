var express = require('express');
const path = require('path');
const db = require('../db/queries');
const validate = require('../validation/validation');
const converter = require('csvtojson');
const { Readable } = require('stream');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('upload', { title: 'Upload Page' });
});

router.post('/', async (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.uploadFile;
    const extension = path.extname(file.name);
    const allowedExtensions = ['.csv', '.xls', '.xlsx'];

    if (!allowedExtensions.includes(extension)) {
        return res.status(422).send("Invalid File Format");
    }

    const stream = Readable.from(file.data.toString());
    const jsonArray = await converter().fromStream(stream);


    const error = await validate(jsonArray);
    console.log(error.error);
    if (error.error) {
        res.status(400).send(error.error.details[0].message);
    } else {
        db.uploadFile(jsonArray);

        return res.status(200).send('success');
    }
});

module.exports = router;
