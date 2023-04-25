/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */
/* eslint prefer-template: 0 */
/* global jQuery, Handlebars, Router */
jQuery(function ($) {
    "use strict";

    Handlebars.registerHelper("eq", function (a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
    });

    var App = {
        init: function () {
            this.todos = [];
            this.todoTemplate = Handlebars.compile($("#todo-template").html());
            this.footerTemplate = Handlebars.compile($("#footer-template").html());
            this.bindEvents();

            router(route => {
                this.filter = route;
                this.render();
            }).init();

            const dummyNodeToNotifyAppIsReady = document.createElement("div");
            dummyNodeToNotifyAppIsReady.id = "appIsReady";
            document.body.appendChild(dummyNodeToNotifyAppIsReady);
        },
        bindEvents: function () {
            $("#new-todo").on("keyup", this.handleTodoInput.bind(this));
            $("#toggle-all").on("change", this.handleToggleAll.bind(this));
            $("#footer").on("click", ".clear-completed", this.handleRevoveCompleted.bind(this));
            $("#todo-list")
                .on("change", ".toggle", this.handleTodoToggle.bind(this))
                .on("dblclick", "label", this.handleTodoEditStart.bind(this))
                .on("keyup", ".edit", this.handleTodoEditStop.bind(this))
                .on("focusout", ".edit", this.handleTodoUpdate.bind(this))
                .on("click", ".destroy", this.handleTodoButton.bind(this));
        },
        render: function () {
            // console.trace();
            let start = performance.now();
            const currentTodos = this.getFilteredTodos();
            const activeTodoCount = this.getActiveTodos().length;
            const todoCount = this.todos.length;
            const completedTodoCount = todoCount - activeTodoCount;
            $("#toggle-all").prop("checked", activeTodoCount === 0);
            console.log("render prereq", performance.now() - start);
            start = performance.now();
            $("#todo-list").html(this.todoTemplate(currentTodos));

            if (todoCount > 0) {
                $("#footer").html(this.footerTemplate({
                    activeTodoCount: activeTodoCount,
                    activeTodoWord: pluralize(activeTodoCount, "item"),
                    completedTodos: completedTodoCount,
                    filter: this.filter,
                }));
            }

            $("#main").toggle(todoCount > 0);
            $("#footer").toggle(todoCount > 0);
            // $("#new-todo").trigger("focus");
            console.log("render second", performance.now() - start);
        },
        getActiveTodos: function () {
            return this.todos.filter(function (todo) {
                return !todo.completed;
            });
        },
        getCompletedTodos: function () {
            return this.todos.filter(function (todo) {
                return todo.completed;
            });
        },
        getFilteredTodos: function () {
            if (this.filter === "active")
                return this.getActiveTodos();

            if (this.filter === "completed")
                return this.getCompletedTodos();

            return this.todos;
        },
        handleToggleAll: function (e) {
            var isChecked = $(e.target).prop("checked");

            this.todos.forEach(function (todo) {
                todo.completed = isChecked;
            });

            this.render();
        },
        handleRevoveCompleted: function () {
            this.todos = this.getActiveTodos();
            this.render();
        },
        // accepts an element from inside the `.item` div and
        // returns the corresponding index in the `todos` array
        indexFromEl: function (el) {
            const id = $(el).closest("li").data("id");
            const todos = this.todos;
            let i = todos.length;

            while (i--) {
                if (todos[i].id === id)
                    return i;
            }

            return -1;
        },
        handleTodoInput: function (e) {
            if (e.key !== "Enter")
                return;
            window.numCalls = (window.numCalls || 0) + 1;
            console.log("Num calls", window.numCalls)
            let start = performance.now();
            const $input = $(e.target);
            const text = $input.val().trim();

            this.todos.push({
                id: uuid(),
                title: text,
                completed: false,
            });

            $input.val("");
            console.log("handleTodoInput", performance.now() - start);
            start = performance.now();
            this.render();
            console.log("render", performance.now() - start);
        },
        handleTodoToggle: function (e) {
            const index = this.indexFromEl(e.target);
            this.todos[index].completed = !this.todos[index].completed;
            this.render();
        },
        handleTodoEditStart: function (e) {
            const $input = $(e.target).closest("li").addClass("editing").find(".edit");
            const title = $(e.target).text();
            $input.trigger("focus").val("").val(title);
        },
        handleTodoEditStop: function (e) {
            switch (e.key) {
                case "Enter":
                    $(e.target).trigger("blur");
                    break;
                case "Escape":
                    $(e.target).data("abort", true).trigger("blur");
                    break;
            }
        },
        handleTodoUpdate: function (e) {
            const $input = $(e.target);
            const text = $input.val().trim();

            if (text === "") {
                this.handleTodoButton(e);
                return;
            }

            if ($input.data("abort")) {
                $input.data("abort", false);
                $input.val("").closest("li").removeClass("editing");
                return;
            }

            this.todos[this.indexFromEl(e.target)].title = text;
            this.render();
        },
        handleTodoButton: function (e) {
            this.todos.splice(this.indexFromEl(e.target), 1);
            this.render();
        },
    };

    window.app = App;
    window.app.init();
});
