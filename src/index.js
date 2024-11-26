import './style.css';
import { toggleTaskCompletion, clearCompletedTasks } from './clearAll.js';
import { addDragAndDropEvents } from './drag&Drop.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function renderTasks() {
  const taskListContainer = document.querySelector('.all-lists');
  taskListContainer.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    listItem.setAttribute('data-index', task.index);
    listItem.setAttribute('draggable', true);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    checkBox.addEventListener('change', () => {
      tasks = toggleTaskCompletion(tasks, task.index);
      saveTasks();
      renderTasks();
    });

    const taskDescription = document.createElement('span');
    taskDescription.textContent = task.description;

    if (task.completed) {
      taskDescription.style.textDecoration = 'line-through';
      taskDescription.style.color = '#A9A9A9';
    }

    taskDescription.addEventListener('dblclick', () => editTaskDescription(task.index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => deleteTask(task.index));

    listItem.appendChild(checkBox);
    listItem.appendChild(taskDescription);
    listItem.appendChild(deleteButton);

    taskListContainer.appendChild(listItem);
  });

  addDragAndDropEvents(taskListContainer, tasks, renderTasks, saveTasks);
}

export function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

export function deleteTask(taskIndex) {
  tasks = tasks.filter(task => task.index !== taskIndex);

  tasks.forEach((task, idx) => {
    task.index = idx + 1;
  });

  saveTasks();
  renderTasks();
}

export function editTaskDescription(taskIndex) {
  const task = tasks.find(t => t.index === taskIndex);
  const newDescription = prompt('Edit task description:', task.description);
  if (newDescription) {
    task.description = newDescription;
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function setupEventListeners() {
  const addButton = document.querySelector('.btn-add');
  const inputField = document.querySelector('.input');

  if (addButton) {
    addButton.addEventListener('click', () => {
      const taskDescription = inputField.value.trim();
      if (taskDescription) {
        addTask(taskDescription);
        inputField.value = '';
      }
    });
  }

  const clearButton = document.querySelector('.btn-clear');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      tasks = clearCompletedTasks(tasks);
      saveTasks();
      renderTasks();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderTasks();
});
