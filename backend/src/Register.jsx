// Assuming you have a `register` function to handle the registration logic

const Register = ({ setUsername, setPassword, onRegister }) => {
    const [username, setUsernameLocal] = createSignal('');
    const [password, setPasswordLocal] = createSignal('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Assuming you have a register function that sends a POST request to the registration endpoint
      await register({ username: username(), password: password() });
  
      // Update the state in the parent component (App.tsx) if needed
      setUsername(username());
      setPassword(password());
  
      // Notify the parent component about the registration
      onRegister();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username()} onInput={(e) => setUsernameLocal(e.target.value)} />
  
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password()} onInput={(e) => setPasswordLocal(e.target.value)} />
  
        <button type="submit">Register</button>
      </form>
    );
  };
  
  export default Register;
  