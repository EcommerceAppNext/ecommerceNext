import React, { createContext, useContext, useEffect, useState } from 'react';
import "web-storage-apis";

interface User {
  userId: number;
  userRole: string;
}

interface AuthContextProps {
  user: User | null;
  handleLogin: (token: string, userId: number, userRole: string) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

// export const useAuth = () => useContext(AuthContext);

 const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    const storedUserRole = sessionStorage.getItem('userRole');

    if (storedUserId && storedUserRole) {
      setUser({
        userId: Number(storedUserId),
        userRole: storedUserRole,
      });
    }
  }, []);

  const handleLogin = (token: string, userId: number, userRole: string) => {
    setUser({
      userId,
      userRole,
    });

    // Store user ID and role in sessionStorage
    sessionStorage.setItem('userId', userId.toString());
    sessionStorage.setItem('userRole', userRole);
  };

  const handleLogout = () => {
    setUser(null);

    // Remove user ID and role from sessionStorage
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
  };
  
  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider