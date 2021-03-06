const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String, required: true},
    firstLogin: {type: Date, required: true},
    lastLogin: {type: Date, default: null},
    token: {type: String, default: null},
    isTokenBlacklisted: {type: Boolean, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);