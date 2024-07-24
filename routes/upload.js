const express = require('express');
const router = express.Router();7
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
    }

});

const upload = multer({ storage});


// api/upload
router.post('/', upload.single("image"), (req, res) => {
    res.status(200).json({message: 'File uploaded successfully'});
});


module.exports = router;
