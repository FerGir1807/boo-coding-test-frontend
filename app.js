'use strict';

const express = require('express');
const { connect } = require('./db/connection');
const app = express();
const port = process.env.PORT || 3000;


// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use('/', require('./routes/profile')());


connect().then(() => {
    try {
        // start server
        const server = app.listen(port);
        console.log('Express started. Listening on %s', port);
    } catch (error) {
        console.log("Error to access the DB.", error)
    }
}).catch((error) => {
    console.log("Error when connecting to DB.", error)
});