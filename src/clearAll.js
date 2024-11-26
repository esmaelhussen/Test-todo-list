export function toggleTaskCompletion(tasks, taskIndex) {
    const task = tasks.find(t => t.index === taskIndex);
    if (task) {
      task.completed = !task.completed; 
    }
    return tasks; 
  }
  
  export function clearCompletedTasks(tasks) {
    const updatedTasks = tasks.filter(task => !task.completed); 
    return updatedTasks; 
  }
  