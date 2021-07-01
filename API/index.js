const express = require('express');
const app = express();
const config = require('config');
const cors = require('cors');
const connectDB = require('./config/connectDB');

const port = config.get('port');

// Database Connection
connectDB();

app.use(cors());

app.use(express.json());

require('./routes')(app);

app.listen(port, (err) => {
    if(err) {
        console.log('ERROR while starting server: ',err);
    }
    console.log('Server is running on port '+port);
} )

module.exports = app;

