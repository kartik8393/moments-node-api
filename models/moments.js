const mongoose = require('mongoose')


const momentSchema = new mongoose.Schema({
    image: {
        type: String,
        required: 'Image is required!'
    },
    title:  {
        type: String,
        required: 'Title is required!'
    },
    tags:  {
        type: [String],
        required: 'Tags is required!'
    },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    
})

module.exports.Moment = mongoose.model('Moments', momentSchema)

