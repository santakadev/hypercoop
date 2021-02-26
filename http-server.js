var express = require('express');
var bodyParser = require('body-parser')
var feed = require('./hypercore-server')

var app = express();

var jsonParser = bodyParser.json()

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/', jsonParser, function (req, res) {
    feed.append(req.body) // Possible abstracion: Command Bus
    res.send(req.body);
});

var port = 8080

app.listen(port, () => {
    console.log(`HTTP API listening at http://localhost:${port}`)
})