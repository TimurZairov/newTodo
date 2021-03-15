'use strict';

//класс
class Todo {
    //constructor передааем отсды элементы через html
    // присваиваем this
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    // добавляем todoData в localStorage
    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }


    //метод render вызывается до addTodo что бы сразу все подгрузил
    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.input.value = '';
        //вызываем метод createItem для каждой задачи 
        // надо передать this в  foreach
        this.todoData.forEach(this.createItem, this);
        // не забываем прописывать this
        // вызываем при рендере что бы подгрузить все 
        this.addToStorage();
    }
    // CreateItem метод добавляем li элемент на страницу
    // this тут undefinde надо передать в функции render что бы появлялась задача
    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>
    `);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }

        this.handler(li);
    }
    // addTodo метод
    addTodo(e) {
        e.preventDefault();
        if(this.input.value === ''){
            alert('Заполните пустую строку!');
        }
        if (this.input.value.trim()) {
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
    //удаляем элемент
    deleteItem(elem) {
        this.todoData.forEach((item) => {
            if(item.key === elem.key){
                this.todoData.delete(item.key);
            }
        });
        this.render();
    }
    //добавляем в завершенные
    completedItam(elem) {
        this.todoData.forEach(item => {
            if (item.key === elem.key) {
                item.completed = !item.completed;
            }
        });

        this.render();
    }

    handler(elem) {
        elem.querySelector('.todo-remove').addEventListener('click', () => {
            this.deleteItem(elem);
        });

        elem.querySelector('.todo-complete').addEventListener('click', () => {
            this.completedItam(elem);
        });
    }
    // init метод
    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();