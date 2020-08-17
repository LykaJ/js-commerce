const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstLogin: {type: Date, required: true},
    lastLogin: {type: Date, required: false},
    token: {type: String, required: false},
    loggedIn: {type: String, required: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);