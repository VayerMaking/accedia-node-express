var express = require('express');
const path = require('path');
const db = require('../queries');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('upload', { title: 'Upload Page' });
});

router.post('/', (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.uploadFile;
    const extension = path.extname(file.name);
    const allowedExtensions = ['.csv', '.xls', '.xlsx'];

    if (!allowedExtensions.includes(extension)) {
        return res.status(422).send("Invalid File Format");
    }
    db.uploadFile(file);

    return res.status(200).send('success');
});

module.exports = router;
