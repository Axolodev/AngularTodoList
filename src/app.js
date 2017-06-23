"use strict";
(function() {
    var app = angular.module('todoApp', []);

    var taskList = [{
        "id": 1,
        "name": "Build",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae nostrum distinctio rem unde a, quo dolores dolorum reiciendis quis quae est quidem provident culpa, voluptatum ipsam optio saepe incidunt in, aut esse fugit aperiam corporis? Officiis similique et cumque laboriosam!",
        "done": false
    }, {
        "id": 2,
        "name": "Get groceries",
        "description": "Go to Walmart and get some groceries.",
        "done": true
    }];


    app.directive('app', function() {
        return {
            restrict: 'E',
            templateUrl: 'src/app.html',
            controller: ["$scope", function($scope) {
                var self = this;

                this.tasks = taskList;

                this.insertTask = function(task){
                    var max_id = -1;

                    this.tasks.map(function(value){
                        if(value.id > max_id) {
                            max_id = value.id;
                        }
                    });

                    task.id = max_id + 1;
                    task.done = false;
                    this.tasks.push(angular.copy(task));
                    task.name = "";
                    task.description = "";
                };
            }],
            controllerAs: 'appCtrl'
        };
    });

    app.directive('task', function() {
        return {
            restrict: 'E',
            templateUrl: 'src/task.html',
            controller: function() {
                this.editMode = false;

                this.changeTaskState = function(task) {
                    task.done = !task.done;
                };

                this.changeEditMode = function() {
                    this.editMode = !this.editMode;
                }

                this.deleteTask
            },
            controllerAs: 'singleTaskCtrl'
        };
    });

    app.directive('taskInput', function() {
        return {
            restrict: 'E',
            templateUrl: 'src/task-input.html',
            controllerAs: 'taskInputCtrl',
            controller: ["$scope", function($scope) {
                var self = this;
                this.inputMode = false;
                this.task = {};
                this.insertTaskMode = false;

                this.changeInsertTaskMode = function() {
                    this.insertTaskMode = !this.insertTaskMode;
                };
            }],
        };
    });


})();
