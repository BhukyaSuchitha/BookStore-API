const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        enum: ['admin','customer'],
        type: String
    }
},{

    // Used to show the created and updates time of document in the DB
    
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)