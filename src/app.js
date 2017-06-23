"use strict";
(function() {
    var app = angular.module('todoApp', ["ngAnimate"]);
    var next_id = 3;

    // Simulating a database.
    var taskList = [{
        "id": 1,
        "name": "Build",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae nostrum distinctio rem unde a, quo dolores dolorum reiciendis quis quae est quidem provident culpa, voluptatum ipsam optio saepe incidunt in, aut esse fugit aperiam corporis? Officiis similique et cumque laboriosam!",
        "done": false
    }, {
        "id": 2,
        "name": "Get groceries",
        "description": "Go to Wall-E Mart and get some groceries.",
        "done": true
    }];


    // Directives start here.

    // app directive. Root directive for the whole app.
    app.directive('app', function() {
        return {
            restrict: 'E',
            templateUrl: 'src/app.html',
            controller: function() {
                var self = this;

                this.tasks = taskList;

                /**
                * Inserts a task into the task list.
                * @param {Object} task The task to be inserted into the list.
                */
                this.insertTask = function(task) {
                    task.id = next_id++;
                    task.done = false;
                    this.tasks.push(angular.copy(task));
                    task.name = "";
                    task.description = "";
                };
            },
            controllerAs: 'appCtrl'
        };
    });

    // task-input directive. This allows the creation of tasks.
    app.directive('taskInput', function() {
        return {
            restrict: 'E',
            templateUrl: 'src/task-input.html',
            controllerAs: 'taskInputCtrl',
            controller: function() {
                var self = this;
                this.inputMode = false;
                this.task = {};
                this.insertTaskMode = false;

                this.changeInsertTaskMode = function() {
                    this.insertTaskMode = !this.insertTaskMode;
                };
            },
        };
    });

    // task directive, for individual tasks.
    app.directive('task', function() {
        return {
            restrict: 'E',
            templateUrl: 'src/task.html',
            controller: function() {
                this.editMode = false;
                this.clonedTask = {};

                /**
                * Changes the state from a task. (done-> undone, undone-> done)
                * @param {Object} task The task which changed its state
                */
                this.changeTaskState = function(task) {
                    task.done = !task.done;
                };

                /**
                * Sets the edit mode for the current controller. This allows
                * edition of a task.
                * @param {Object} task Task to be edited.
                */
                this.changeEditMode = function(task) {
                    this.editMode = !this.editMode;
                    this.clonedTask = angular.copy(task);
                }

                /**
                * Deletes a task from the task list.
                * @param {Object} task Task to be deleted.
                */
                this.deleteTask = function(task){

                }
            },
            controllerAs: 'singleTaskCtrl'
        };
    });


    // / Directives end here

})();
