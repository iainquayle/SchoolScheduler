import { createSignal } from 'solid-js';
import AuthService from './AuthService.solid';

const Register = (props) => {
  const authService = AuthService();
  const [newUserId, setNewUserId] = createSignal('');
  const [newPassword, setNewPassword] = createSignal('');

  const handleRegister = (e) => {
    e.preventDefault();

    // Replace this with actual backend call when backend is ready
    const isRegistered = authService.register({ userId: newUserId(), password: newPassword() });

    if (isRegistered) {
      alert('Registration successful! You can now login.');
    } else {
      alert('User ID is already taken. Please choose a different one.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          New User ID:
          <input type="text" value={newUserId()} onInput={(e) => setNewUserId(e.target.value)} />
        </label>
        <br />
        <label>
          New Password:
          <input type="password" value={newPassword()} onInput={(e) => setNewPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
