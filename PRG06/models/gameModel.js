let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// Strings only!
let gameModel = new Schema({
    title: { 
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true,
    },
    manufacturer: { 
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Game', gameModel);