const mongoose = require("mongoose");
const { validateEmail } = require('../util');

const User = new mongoose.Schema({
    first_name: {
        type: String,
        default: null,
        required: 'First name is required',
    },
    last_name: {
        type: String,
        default: null,
        required: 'Last name is required',
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    username: {
        type: String,
        unique: true,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Username is required',
    },
    password: { type: String },
    token: { type: String },
    avatar: { type: String, default: 'some-avatar-icon' },
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'UserStatus' }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("User", User);