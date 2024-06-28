require('dotenv').config();
const path = require("path");
var express = require('express');
var app = express();
const router = express.Router();

// Serve static html, js, css, and image files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Set EJS View Engine**
app.set('view engine', 'ejs');
// Set HTML engine**
app.engine('html', require('ejs').renderFile);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
    res.render("main");
});

app.listen(process.env.PORT, console.log('Server start at port: ' + process.env.PORT));