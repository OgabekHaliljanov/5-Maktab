const { Schema, model } = require('mongoose');

const proSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
    }
});

const Products = model('tavarlar', proSchema);
module.exports = Products;

