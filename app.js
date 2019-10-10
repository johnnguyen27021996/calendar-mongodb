const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:trung888@bookingmaganer-z0td3.mongodb.net/calendar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbGuest = require('./guest.model');
const dbBook = require('./booking.model'); 

app.get('/', function(req, res){
    dbBook.find({}).populate('guestID').exec((err, doc)=>{
        res.render('index', {
            book: doc
        });
    })
    
})

app.get('/book', (req, res)=>{
    res.render('book');
})

app.post('/book', (req, res)=>{
    var rb = req.body,
    firstname = rb.firstname,
    lastname = rb.lastname,
    email = rb.email;
    phone = rb.phone,
    city = rb.city,
    total = rb.total,
    date = rb.date,
    bookdate = new Date(date);
    var guest = new dbGuest({
        firstname : firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        city: city
    });
    guest.save((err)=>{
        if(!err){
            dbGuest.find({}).sort({_id: -1}).limit(1).exec((err, doc)=>{
                var newbooking = new dbBook({
                    guestID: doc[0]['_id'],
                    total: total,
                    createBook: bookdate
                })
                newbooking.save((err)=>{
                    if(!err){
                        res.redirect('/success');
                    }
                })
            })
        }
    });
    
})

app.get('/success', (req, res)=>{
    res.render('success');
})

app.get('/calendar', (req, res)=>{
    dbBook.find({}).populate('guestID').exec((err, doc)=>{
        res.send(doc);
    })
})

app.listen(3000);
module.exports = app;