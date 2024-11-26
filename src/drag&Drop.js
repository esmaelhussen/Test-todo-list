export function addDragAndDropEvents(taskListContainer, tasks, renderTasks, saveTasks) {
  
    let draggedItemIndex = null;
    taskListContainer.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('task-item')) {
        draggedItemIndex = parseInt(e.target.getAttribute('data-index'));
        e.target.style.opacity = '0.4'; 
      }
    });
 
    taskListContainer.addEventListener('dragover', (e) => {
      e.preventDefault(); 
      const draggingOverItem = e.target.closest('.task-item');
      if (draggingOverItem && draggingOverItem !== e.target) {
        draggingOverItem.style.borderTop = '2px solid #ccc'; 
      }
    });
  
    
    taskListContainer.addEventListener('drop', (e) => {
      e.preventDefault(); 
  
      const draggingOverItem = e.target.closest('.task-item');
      if (draggingOverItem && draggedItemIndex !== null) {
        const targetIndex = parseInt(draggingOverItem.getAttribute('data-index'));
  
        if (draggedItemIndex !== targetIndex) {
        
          const draggedItem = tasks.find(t => t.index === draggedItemIndex);
          const targetItem = tasks.find(t => t.index === targetIndex);
  
          const draggedIndexInArray = tasks.indexOf(draggedItem);
          const targetIndexInArray = tasks.indexOf(targetItem);
  
          tasks.splice(draggedIndexInArray, 1);
  
  
          tasks.splice(targetIndexInArray, 0, draggedItem);
  
       
          tasks.forEach((task, index) => {
            task.index = index + 1; 
          });
  
       
          saveTasks(tasks);
          renderTasks(tasks);
        }
      }
  
      if (draggingOverItem) {
        draggingOverItem.style.borderTop = '';
      }
      const draggedItem = document.querySelector(`[data-index="${draggedItemIndex}"]`);
      if (draggedItem) {
        draggedItem.style.opacity = ''; 
      }
    });
  }
  