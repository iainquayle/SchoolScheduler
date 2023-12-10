import { createSignal } from 'solid-js';

function Login({ setUserid, setPassword, onSubmit }) {
  const [username, setUsername] = createSignal('');
  const [password, setPasswordLocal] = createSignal('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have a login function that sends a POST request to the login endpoint
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username(), password: password() }),
      });

      if (response.ok) {
        console.log('Login successful');
        setUserid(username());
        setPassword(password());
        onLogin();
      } else {
        console.log('Invalid credentials');
        // Handle the case where login failed
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username()}
        onInput={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password()}
        onInput={(e) => setPasswordLocal(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
