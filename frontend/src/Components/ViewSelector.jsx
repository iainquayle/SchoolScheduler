import { createSignal } from 'solid-js';
import ViewSelector from './ViewSelector'; // Update the path based on your project structure
import TodoList from './TodoList'; // Update the path based on your project structure
import CustomCalendar from './CustomCalendar'; // Update the path based on your project structure
import Statistics from './Statistics'; // Update the path based on your project structure

const App = () => {
  const [currentView, setCurrentView] = createSignal('todoList');

  const handleViewChange = (view) => {
    // Implement logic for changing the view
    setCurrentView(view);
  };

  return (
    <div>
      <ViewSelector onViewChange={handleViewChange} />
      {currentView() === 'ToDoList' && <TodoList />}
      {currentView() === 'Calendar' && <CustomCalendar />}
      {currentView() === 'Statistics' && <Statistics />}
    </div>
  );
};

export default App;
