import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseLoginReturn {
  // Form state
  userName: string;
  password: string;
  showPassword: boolean;
  
  // UI state
  error: string;
  isLoading: boolean;
  
  // Actions
  setUserName: (value: string) => void;
  setPassword: (value: string) => void;
  togglePasswordVisibility: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  // Form state
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // UI state
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Check dummy credentials
      if (userName.toLowerCase() === 'admin' && password === 'admin') {
        // Generate dummy tokens
        const dummyAccessToken = 'dummy-access-token-' + Date.now();
        const dummyRefreshToken = 'dummy-refresh-token-' + Date.now();
        const dummyPkid = 'dummy-pkid-123';
        const dummyTokenId = 'dummy-token-id-' + Date.now();

        // Store dummy tokens in localStorage
        localStorage.setItem('accessToken', dummyAccessToken);
        localStorage.setItem('pkid', dummyPkid);
        localStorage.setItem('tokenId', dummyTokenId);
        localStorage.setItem('refreshToken', dummyRefreshToken);

        // Navigate to users page
        navigate('/users');
      } else {
        // Show error for invalid credentials
        setError('Invalid username or password. Please use "admin" for both username and password.');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  return {
    // Form state
    userName,
    password,
    showPassword,
    
    // UI state
    error,
    isLoading,
    
    // Actions
    setUserName,
    setPassword,
    togglePasswordVisibility,
    handleSubmit,
  };
}