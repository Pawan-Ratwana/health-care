const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    emergencyNumber: {
        type: Number,
        required: true
    },
    medicinePlan: {
        type: [String], // Array of times, e.g., ['08:00', '12:00', '19:00']
        default: [],
    },
},
    {
        timestamps: true
    });

const User = mongoose.model('user', userSchema);

module.exports = User;