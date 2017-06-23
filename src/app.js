"use strict";
(function(){
    var app = angular.module('todoApp', []);

    var taskList = [{
        "id": "1",
        "name": "Build",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae nostrum distinctio rem unde a, quo dolores dolorum reiciendis quis quae est quidem provident culpa, voluptatum ipsam optio saepe incidunt in, aut esse fugit aperiam corporis? Officiis similique et cumque laboriosam!",
        "done": false
    }, {
        "id": "2",
        "name": "Get groceries",
        "description": "Go to Walmart and get some groceries.",
        "done": true
    }];

    app.directive('app', function(){
        return {
            restrict:'E',
            templateUrl: 'src/app.html',
            controller: ["$scope", function($scope){
                var self = this;

                this.tasks = taskList;
            }],
            controllerAs: 'appCtrl'
        };
    });

    app.directive('task', function(){
        return {
            restrict: 'E',
            templateUrl: 'src/task.html',
            controller: function() {
                this.editMode = false;

                this.changeTaskState = function(task){
                    task.done = !task.done;
                };

                this.changeEditMode = function(){
                    this.editMode = !this.editMode;
                }
            },
            controllerAs: 'singleTaskCtrl'
        };
    });

    app.directive('taskInput', function(){
        return {
            restrict: 'E',
            templateUrl: 'src/task-input.html',
            controllerAs: 'taskInputCtrl',
            controller: ["$scope", function($scope) {
                var self = this;
                self.inputMode = false;
                self.task = {};

                this.submitTask = function() {
                    $scope.$emit("taskSubmitted", self.task)
                }
            }],
        };
    });


})();
