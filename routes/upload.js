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
    uploadPath = __basedir + '/public/uploads/' + file.name;

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
    });
    console.log(uploadPath);
    db.uploadFile(uploadPath);
    return res.status(200).send('success');
});

module.exports = router;
