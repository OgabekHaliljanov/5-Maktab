const { Schema, model } = require('mongoose');

const balansSchema = new Schema({
    balans: {
        type: Number,
        default: 0
    },
});

const Balans = model('Balans', balansSchema);
module.exports = Balans;
