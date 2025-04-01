import React from 'react';
import logger from '../utils/logger';

// Simplified error boundary with minimal rendering logic
class ErrorBoundaryFallback extends React.Component {
  state = { hasError: false, errorInfo: null };

  static getDerivedStateFromError = () => ({ hasError: true });

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
    logger.error('ErrorBoundary caught an error', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Get theme from props, or use defaults if not available
      const { theme } = this.props;
      
      return (
        <div className={`${theme?.main || 'bg-gray-100'} min-h-screen p-4 flex flex-col items-center justify-center`}>
          <div className={`${theme?.accent || 'bg-red-100'} border ${theme?.border || 'border-red-400'} rounded-lg p-6 max-w-lg w-full shadow-lg`}>
            <h2 className={`${theme?.text || 'text-red-800'} text-xl font-bold mb-4`}>
              Something went wrong
            </h2>
            <p className="mb-4">
              The application encountered an unexpected error. We've recorded the issue and will work to fix it.
            </p>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => window.location.reload()}
                className={`${theme?.accent || 'bg-red-500'} text-white py-2 px-4 rounded hover:opacity-90 transition-opacity`}
              >
                Reload Page
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
              >
                Go Back
              </button>
            </div>
            {process.env.NODE_ENV !== 'production' && (
              <details className="mt-4 p-2 bg-gray-50 rounded border border-gray-200">
                <summary className="cursor-pointer font-medium">Error Details (Developer Only)</summary>
                <pre className="mt-2 p-2 text-xs overflow-auto bg-gray-100 rounded">
                  {this.state.errorInfo?.componentStack || 'No component stack available'}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// We need to make this wrapper component less dependent on ThemeContext
const ErrorBoundary = ({ children }) => {
  // Try to access the theme context, but gracefully handle when it's not available
  let theme = null;
  
  try {
    // Dynamically import useTheme only if needed
    const { useTheme } = require('../context/ThemeContext');
    try {
      // Try to use the theme context, but don't crash if it's not available
      const { currentTheme } = useTheme() || {};
      theme = currentTheme;
    } catch (e) {
      // If useTheme throws an error (not in provider), just use null theme
      logger.debug('Theme context not available, using default styling for ErrorBoundary');
    }
  } catch (e) {
    // If the import itself fails, just continue with null theme
    logger.debug('Could not import ThemeContext, using default styling for ErrorBoundary');
  }
  
  return (
    <ErrorBoundaryFallback theme={theme}>
      {children}
    </ErrorBoundaryFallback>
  );
};

export default ErrorBoundary;
