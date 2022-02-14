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

const render = (toDoData) => {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  localStorage.dataToDo = JSON.stringify(toDoData);

  toDoData.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
      <span class="text-todo">${item.text}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>`;
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", (e) => {
      e.preventDefault();
      item.completed = !item.completed;
      render(toDoData);
    });

    li.querySelector(".todo-remove").addEventListener("click", (e) => {
      e.preventDefault();
      toDoData.splice(index, 1);
      render(toDoData);
    });
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
    render(toDoData);
  }
});

if (!!localStorage.dataToDo && localStorage.dataToDo.length > 0) {
  toDoData = JSON.parse(localStorage.dataToDo);
  render(toDoData);
}
// console.log(todoControl);
// console.log(headerInput);
// console.log(headerButton);
// console.log(todoList);
// console.log(todoCompleted);
