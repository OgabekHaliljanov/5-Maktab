const { Schema, model } = require('mongoose');
const moment = require('moment');

const stoyrProSchema = new Schema({
    price: { type: String },
    productId: { type: String },
    userId: { type: String },
    amount: { type: Number },
    date: { type: String, default: moment().format("DD.MM.YYYY  HH:MM") },
});

const stoyrPro = model('stoyrPro', stoyrProSchema);
module.exports = stoyrPro;

