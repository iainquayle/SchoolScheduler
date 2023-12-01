import { createSignal } from 'solid-js';
import Header from './Header.solid';
import Login from './Login.solid';
import ViewSelector from './ViewSelector.solid';
import Calendar from './Calendar.solid';
import TodoList from './TodoList.solid';
import Statistics from './Statistics.solid';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const [view, setView] = createSignal('calendar');

  const handleLogin = () => {
    // Perform authentication logic
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegister = (userData) => {
    
  };

  const handleResetPassword = (email) => {
    
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      {isLoggedIn() ? (
        <div>
          <Header onLogout={handleLogout} />
          <div>
            <ViewSelector onViewChange={handleViewChange} />
            {view() === 'calendar' && <Calendar />}
            {view() === 'todolist' && <TodoList />}
            {view() === 'statistics' && <Statistics />}
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
