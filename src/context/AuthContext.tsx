import { createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // In a real app, you would get this from your authentication system
  const user = {
    id: '123',
    name: 'John Doe',
    roles: ['agent'] // or ['supervisor'] for users with permission
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);