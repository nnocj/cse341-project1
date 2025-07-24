const express = require('express');
const router = express.Router();
const path = require('path');


const {MongoClient} = require('mongodb');

//serve static files from the public folder
router.use(express.static(path.join(__dirname, 'public')));


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

module.exports = router;