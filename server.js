var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoOps = require('./server/MongoOperations.js');
var path = require('path');

var port = process.env.port || 1337;

var app = express();
app.use(bodyParser());

app.get('/api/tasks', mongoOps.fetch);

app.post('/api/tasks', mongoOps.add);

app.put('/api/tasks/:taskId', mongoOps.modify);

app.get('/', function (request, response) {
    response.sendfile("views/Tasks.html");
});
app.use(express.static(path.join(__dirname, 'public')));

   
app.listen(port);