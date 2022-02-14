"use strict";
const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let toDoData = [];

const isNoStrongNumber = (num) => {
  num += "";
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const isText = (text) => {
  return text && text.trim().length > 0 && !isNoStrongNumber(text);
};

const saveData = (data) => {
  localStorage.dataToDo = JSON.stringify(data);
};

const loadData = () => {
  return JSON.parse(localStorage.dataToDo);
};

const render = () => {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData = loadData();

  toDoData.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
      <span class="text-todo">${item.text}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>`;

    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.completed = !item.completed;
      saveData(toDoData);
      render();
    });

    li.querySelector(".todo-remove").addEventListener("click", () => {
      toDoData.splice(index, 1);
      saveData(toDoData);
      render();
    });

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
  });
};

todoControl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isText(headerInput.value)) {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };

    toDoData.push(newToDo);
    headerInput.value = "";
    saveData(toDoData);
    render();
  }
});

if (!!localStorage.dataToDo && localStorage.dataToDo.length > 0) {
  toDoData = loadData();
  render();
}
