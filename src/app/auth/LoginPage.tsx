import React from 'react';
import { useLogin } from '../../hooks/auth/useLogin';
import '../../styles/_login.scss';

const LoginPage: React.FC = () => {
  const {
    userName,
    password,
    showPassword,
    error,
    isLoading,
    setUserName,
    setPassword,
    togglePasswordVisibility,
    handleSubmit
  } = useLogin();

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-heading">
          <h1 className="login-title">Login</h1>
        </div>

        <div className="login-form">
          <form onSubmit={handleSubmit} className="login-form-content">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="form-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '🔒'}
                </button>
              </div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;