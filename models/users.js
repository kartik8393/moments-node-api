const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Firstname is required!'
    },
    lastName: {
        type: String,
        required: 'Lastname is required!'
    },
    mobile: {
        type: Number,
        required: 'Mobile is required!'
    },
    email: {
        type: String,
        required: 'Email is required!'
    },
    password: {
        type: String,
        required: 'Password is required!'
    },
},
    {
        timestamps: true
    })


module.exports.User = mongoose.model('Users', userSchema)