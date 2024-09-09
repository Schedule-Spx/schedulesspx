// src/components/ErrorBoundary.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Caught an error:", error, errorInfo);
    // You can also log the error to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={`p-4 ${this.props.theme.main} ${this.props.theme.text}`}>
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <details className="whitespace-pre-wrap">
            <summary className="cursor-pointer mb-2">Error details</summary>
            <p className="mb-2">{this.state.error && this.state.error.toString()}</p>
            <p className="text-sm">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use hooks
const ErrorBoundary = (props) => {
  const { currentTheme } = useTheme();
  return <ErrorBoundaryClass {...props} theme={currentTheme} />;
};

export default ErrorBoundary;
