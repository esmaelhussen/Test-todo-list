import { addTask, deleteTask, renderTasks, setupEventListeners } from './index.js';

beforeEach(() => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(() => JSON.stringify([])), 
      setItem: jest.fn(),
    },
    writable: true,

  });

 
  document.body.innerHTML = `
    <div class="all-lists"></div>
    <button class="btn-add">Add</button>
    <input class="input" />
    <button class="btn-clear">Clear</button>
  `;

  document.dispatchEvent(new Event('DOMContentLoaded'));
});

describe('Test add and delete', () => {
  describe('addTask', () => {
    it('should add a new task and update localStorage and the DOM', () => {
      const taskDescription = 'New Task';

      const inputField = document.querySelector('.input');
      inputField.value = taskDescription;

    
      const addButton = document.querySelector('.btn-add');
      addButton.click();

      expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify([{
        description: 'New Task', completed: false, index: 1,
      }]));

  
      const taskListContainer = document.querySelector('.all-lists');
      expect(taskListContainer.childElementCount).toBe(1);

      const taskItem = taskListContainer.querySelector('li');
      expect(taskItem).toBeTruthy();
      expect(taskItem.querySelector('span').textContent).toBe('New Task');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and update localStorage and the DOM', () => {
 
      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn(() => JSON.stringify([{
            description: 'Task to Delete', completed: false, index: 1,
          }])),
          setItem: jest.fn(),
        },
        writable: true,
      });

   
      renderTasks();

      const taskListContainer = document.querySelector('.all-lists');
      expect(taskListContainer.childElementCount).toBe(1);

      const deleteButton = taskListContainer.querySelector('.delete-btn');
      deleteButton.click();

  
      expect(taskListContainer.childElementCount).toBe(0);
      expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify([]));
    });
  });
});
