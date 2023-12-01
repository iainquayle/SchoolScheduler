import { createSignal } from 'solid-js';
import AuthService from './AuthService.solid';

const Login = (props) => {
  const authService = AuthService();
  const [userId, setUserId] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Replace this with actual backend call when backend is ready
    const isAuthenticated = authService.login(userId(), password());

    if (isAuthenticated) {
      // Call the onLogin callback to update the app state
      props.onLogin();
    } else {
      // Display an error message or handle authentication failure
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          User ID:
          <input type="text" value={userId()} onInput={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password()} onInput={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
