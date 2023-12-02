import { createSignal } from 'solid-js';

const AuthService = () => {
  // Simulated user data for demonstration purposes
  const users = [
    { userId: 'demoUser', password: 'demoPassword' },
    // Add more user data as needed
  ];

  const [currentUser, setCurrentUser] = createSignal(null);

  const login = (userId, password) => {
    const user = users.find((u) => u.userId === userId && u.password === password);

    if (user) {
      setCurrentUser(user);
      return true;
    }

    return false;
  };

  const register = (newUser) => {
    // Check if the user ID is already taken
    if (!users.some((u) => u.userId === newUser.userId)) {
      users.push(newUser);
      setCurrentUser(newUser);
      return true;
    }

    return false;
  };

  const resetPassword = (userId, newPassword) => {
    // Replace this with your actual backend reset password logic
    const userIndex = users.findIndex((u) => u.userId === userId);

    if (userIndex !== -1) {
      // Update the password for the user
      users[userIndex].password = newPassword;
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return {
    currentUser,
    login,
    register,
    resetPassword,
    logout,
  };
};

export default AuthService;
