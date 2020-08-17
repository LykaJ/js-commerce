const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dbUrl = require('./dbUrl');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

mongoose.connect(dbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoBD!'))
    .catch(() => console.log('Connection to MongoDB failed.'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api', userRoutes);

module.exports = app;