const mongoose = require('mongoose');

const PartySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party : {
        type: Array,
        required: true
    },
    
});

module.exports = mongoose.model('Party', PartySchema);