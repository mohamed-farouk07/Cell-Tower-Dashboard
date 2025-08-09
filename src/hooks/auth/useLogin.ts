import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseLoginReturn {
  userName: string;
  password: string;
  showPassword: boolean;
  error: string;
  isLoading: boolean;
  setUserName: (value: string) => void;
  setPassword: (value: string) => void;
  togglePasswordVisibility: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

interface UseLoginOptions {
  onLoginSuccess?: () => void;
}

export const useLogin = (options?: UseLoginOptions): UseLoginReturn => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      if (userName.toLowerCase() === 'admin' && password === 'admin') {
        const dummyAccessToken = 'dummy-access-token-' + Date.now();
        const dummyRefreshToken = 'dummy-refresh-token-' + Date.now();
        const dummyPkid = 'dummy-pkid-123';
        const dummyTokenId = 'dummy-token-id-' + Date.now();

        localStorage.setItem('accessToken', dummyAccessToken);
        localStorage.setItem('pkid', dummyPkid);
        localStorage.setItem('tokenId', dummyTokenId);
        localStorage.setItem('refreshToken', dummyRefreshToken);

        // Call the success callback if provided
        if (options?.onLoginSuccess) {
          options.onLoginSuccess();
        }

        navigate('/users');
      } else {
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
    userName,
    password,
    showPassword,
    error,
    isLoading,
    setUserName,
    setPassword,
    togglePasswordVisibility,
    handleSubmit,
  };
};