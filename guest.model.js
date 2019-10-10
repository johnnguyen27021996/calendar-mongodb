// add mongoose to connect database
const mongoose = require('mongoose');
// create a booking
const Schema = mongoose.Schema;
var newGuest = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    city: {
        type: String,
    }
})
// exports table booking
module.exports = mongoose.model('guests', newGuest);