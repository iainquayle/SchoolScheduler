import { createSignal } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

const TodoList = (props) => {
  const { tasks, onTimerStart, onTimerStop, onTimerReset, onTaskCompletion } = props;

  return (
    <div>
      <h2>TodoList View</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <span>Priority: {task.priority}</span>
            <span>
              Time Taken: {task.timeTaken} seconds
              {task.timerRunning ? ' (Running)' : ''}
            </span>
            {!task.completed && (
              <button onClick={() => onTimerStart(task.id)}>Start Timer</button>
            )}
            {!task.completed && (
              <button onClick={() => onTimerStop(task.id)}>Stop Timer</button>
            )}
            <button onClick={() => onTimerReset(task.id)}>Reset Timer</button>
            <button onClick={() => onTaskCompletion(task.id)}>Complete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
