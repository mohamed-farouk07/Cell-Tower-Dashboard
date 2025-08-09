import React from 'react';
import '../../styles/Loader.scss';

interface LoaderProps {
  isLoading: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, message = "Loading..." }) => {
  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
};

export default Loader;