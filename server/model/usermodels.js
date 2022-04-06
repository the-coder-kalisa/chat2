const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        min: 3,
        max: 50,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        max: 20,
        min: 3,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 8,
        unique: true
    }
})
module.exports = mongoose.model("users", userSchema)