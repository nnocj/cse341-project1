const express = require('express');
const app = express();

const {MongoClient} = require('mongodb');


app.get('/', require('./routes'));

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

a
