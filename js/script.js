'use strict';

//класс
class Todo {
    //constructor передааем отсды элементы через html
    // присваиваем this
    constructor(form, input, todolist, todoCmpleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todolist);
        this.todoCmpleted = document.querySelector(todoCmpleted);
        this.todoData = new Map();
    }


    //метод render вызывается до addTodo что бы сразу все подгрузил
    render(){
        //вызываем метод createItem для каждой задачи 
        this.todoData.forEach(this.createItem);
    }
    // CreateItem метод добавляем li элемент на страницу
    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if(todo.completed){
            this.todoCmpleted.append('li');
        }else {
            this.todoList.append('li'); 
        }
    }
    // addTodo метод
    addTodo(e) {
        e.preventDefault();

        if(this.input.value.trim()){
            //объект todo для вывода в todoList
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
        this.todoData.set(newTodo.key, newTodo);
        this.render();
        }
    }
    // метод generatekey для создания рандомного значения
    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(3, 15);
    }
    // init метод
    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-complete');

todo.init();
