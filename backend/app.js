const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const db = require('./src/db'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.db = db;
    next();
});


const auth = require('./src/routes/auth');
app.use('/api/auth', auth);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.error('Error:', error.message);

    res.status(error.status || 500);

    res.json({
        error: {
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
        }
    });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;