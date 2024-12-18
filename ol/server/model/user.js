const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    address: {
        type: String,
    },
});
const User = model('User', userSchema);
module.exports = User;