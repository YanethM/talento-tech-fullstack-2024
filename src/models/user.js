const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    currentPassword:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    active:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;