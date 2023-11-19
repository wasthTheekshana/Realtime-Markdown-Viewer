var express = require('express');

const app = express();

//set the view engine to ejs
app.set('view engine', 'ejs');

//routes for app
app.get('/', function (req, res) {
    res.render('pad');
});

app.get('/(:id)', function (req, res) {
    res.render('pad');
});

//get sharejs dep
var sharejs = require('share');
require('redis');

//option for sharjs

var options = {
    db: { type: 'redis' },
};

//attach the express server to sharejs
sharejs.server.attach(app, options)


//public folder for store assets
app.use(express.static(__dirname + '/public'));


//listen on port
var port = process.env.PORT || 8000;
app.listen(8000);

