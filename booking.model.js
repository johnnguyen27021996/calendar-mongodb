// add mongoose to connect database
const mongoose = require('mongoose');
// create a booking
const Schema = mongoose.Schema;
var newBooking = new Schema({
    guestID: {
        type: Schema.Types.ObjectId,
        ref: 'guests'
    },
    total: {
        type: String
    },
    createBook: {
        type: Date
    }
})
// exports table booking
module.exports = mongoose.model('books', newBooking);