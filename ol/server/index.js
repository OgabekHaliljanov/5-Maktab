const express = require('express');
const { connect } = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MongoDB = () => {
    connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.log("Error>>>", err);
        });
}
MongoDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

const user = require('./routes/userRoute');
const product = require('./routes/products');
const story = require('./routes/story');
const balans = require('./routes/Balans')
app.use('/api', user);
app.use('/api', product);
app.use('/api', story);
app.use('./api', balans)

const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});