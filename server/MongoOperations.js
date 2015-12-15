var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/tasksDB");
var mongoURI = "mongodb://localhost/tasksDB";
var db = mongoose.connect(mongoURI).connection;
db.on('error', function (err) { console.log(err.message); });
db.once('open', function () {
    console.log("mongodb connection open");
});

var tasksScheme = mongoose.Schema({
    name: String,
    description: String,
    attended: Boolean

});
var TaskModel = mongoose.model('task', tasksScheme,'taskinfo');

db.on('error', console.error.bind(console, "connection error"));
db.once('open', function () {
    console.log("tasksDb is open...");
    
    TaskModel.find().exec(function (error, results) {
        
        if (results.length === 0) {
            TaskModel.create({ name: "Meeting", description: "Attend the meeting.", attended: true });
            TaskModel.create({ name: "Meeting 2", description: "Attend the meeting2.", attended: true });
            TaskModel.create({ name: "Meeting 3", description: "Attend the meeting3.", attended: false });
        }
                
    });    
});

exports.fetch = function (request, response) {
    TaskModel.find().exec(function (err, res) {
        if (err) {
            response.send(500, { error: err });
        }
        else {
            response.send(res);
        }
    });
};

exports.add = function (request, response) {
    var newTask = { name: request.body.name, description: request.body.description, attended: false};
    TaskModel.create(newTask, function (addError, addedTask) {
        if (addError) {
            response.send(500, { error: addError });
        }
        else {
            response.send({ success: true, task: addedTask });
        }
    });
};

exports.modify = function (request, response) {
    var TaskId = request.params.TaskId;
    TaskModel.update({ _id: TaskId }, { description: request.body.description, attended: request.body.attended}, { multi: false },
        function (error, rowsAffected) {
        if (error) {
            response.send(500, { error: error });
        }
        else if (rowsAffected == 0) {
            response.send(500, { error: "No rows affected" });
        }
        else {
            response.send(200);
        }
    }
    );
};