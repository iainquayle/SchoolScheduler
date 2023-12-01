import { createSignal } from 'solid-js';
import TodoList from './TodoList'; 

const App = () => {
  const [tasks, setTasks] = createSignal([
    { id: 1, title: 'Task 1', priority: 'High', timeTaken: 0 },
    { id: 2, title: 'Task 2', priority: 'Medium', timeTaken: 0 },
    // Add more tasks as needed
  ]);

  const handleTimerStart = (taskId) => {
    // Implement backend logic for starting the timer
    // You can make an API call or perform any necessary backend operations
  };

  const handleTimerStop = (taskId) => {
    // Implement backend logic for stopping the timer
  };

  const handleTimerReset = (taskId) => {
    // Implement backend logic for resetting the timer
  };

  const handleTaskCompletion = (taskId) => {
    // Implement backend logic for marking the task as completed
  };

  return (
    <div>
      <TodoList
        tasks={tasks()}
        onTimerStart={handleTimerStart}
        onTimerStop={handleTimerStop}
        onTimerReset={handleTimerReset}
        onTaskCompletion={handleTaskCompletion}
      />
    </div>
  );
};

export default App;
