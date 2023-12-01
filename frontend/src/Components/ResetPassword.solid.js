import { createSignal } from 'solid-js';
import AuthService from './AuthService.solid';

const ResetPassword = () => {
  const authService = AuthService();
  const [userId, setUserId] = createSignal('');
  const [newPassword, setNewPassword] = createSignal('');

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Replace this with actual backend call when backend is ready
    const isReset = authService.resetPassword(userId(), newPassword());

    if (isReset) {
      alert('Password reset successful!');
    } else {
      alert('User not found. Please check the user ID and try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label>
          User ID:
          <input type="text" value={userId()} onInput={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          New Password:
          <input type="password" value={newPassword()} onInput={(e) => setNewPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
