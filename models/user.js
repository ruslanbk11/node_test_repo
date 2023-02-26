const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatar: String,
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
