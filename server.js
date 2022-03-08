var express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo');

// mongoose.connect('mongodb+srv://meenakshi:9AMwYqt8FTb7Fr2Z@nodeapi.4dd3k.mongodb.net/sih?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, (err) => {
//   if (!err) {
//     console.log('MongoDB Connection Succeeded.');
//   } else {
//     console.log('Error in DB connection : ' + err);
//   }
// });
// mongoose.connect("mongodb+srv://nodeapi.mongodb.net/sih?retryWrites=true&w=majority", { user: process.env.meenakshi, pass: process.env.9AMwYqt8FTb7Fr2Z, useNewUrlParser: true, useUnifiedTopology: true })

mongoose
 .connect(
'mongodb+srv://meenakshi:9AMwYqt8FTb7Fr2Z@nodeapi.4dd3k.mongodb.net/sih?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
           })
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
    secret: 'story book',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl:'mongodb+srv://meenakshi:9AMwYqt8FTb7Fr2Z@nodeapi.4dd3k.mongodb.net/sih?retryWrites=true&w=majority'  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});



app.listen(3000, function () {
  console.log('Server is started on http://127.0.0.1:');
});
