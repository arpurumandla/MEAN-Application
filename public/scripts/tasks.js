var app = angular.module('tasksApp', []);

app.factory('tasksCRUD', function ($http, $q) {
    var baseurl = "/NodesWebApp1/";
    function getAllTasks() {
        var deferred = $q.defer();
        
        $http.get(baseurl + 'api/tasks').then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    function addTask(newTask) {
        var deferred = $q.defer();
        
        $http.post(baseurl + 'api/tasks', newTask).then(function (result) {
            deferred.resolve(result.data.task);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    function modifyTask(updatedTask) {
        var deferred = $q.defer();
        
        $http.put(baseurl + 'api/tasks/' + updatedTask._id, updatedTask).then(function (data) {
            deferred.resolve(data);
        }, function (error) {
            deferred.reject(error);
        });
        
        return deferred.promise;
    }
    
    return {
        getAllTasks: getAllTasks,
        addTask: addTask,
        modifyTask: modifyTask
    };
});

app.controller('TasksCtrl', function ($scope, tasksCRUD) {
    $scope.released = { released: true };
    $scope.notReleased = { released: false };
    
    function init() {
        tasksCRUD.getAllTasks().then(function (tasks) {
            $scope.tasks = tasks;
        }, function (error) {
            console.log(error);
        });
    }
    
    //$scope.movieReleased = function (movie) {
        
        tasksCRUD.modifyTask({ _id: task._id, name: task.name, attended: true, attended: task.attended})
                  .then(function (result) {
            if (result.status === 200) {
                task.attended  = true;
            }
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.alltaks = function (task) {
        tasksCRUD.modifyTask(task)
                  .then(function (result) {
            if (result.status === 200) {
                console.log("Task updated");
            }
        }, function (error) {
            
        });
    };
    
    $scope.addTask = function () {
        tasksCRUD.addTask({ name: $scope.newTaskText, description: $scope.newTaskDescription }).then(function (newTask) {
            $scope.tasks.push(newTask);
            $scope.newTaskText = "";
        }, function (error) {
            console.log(error);
        });
    };
    
    init();
});