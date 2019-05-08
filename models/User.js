const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//Create user Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

UserSchema.plugin(passportLocalMongoose);

module.exports = User = mongoose.model('users', UserSchema);