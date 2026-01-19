import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // Here you could also log to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <h2>🐻 Oops! Something went wrong</h2>
            <p>
              We apologize for the inconvenience. An unexpected error occurred while
              loading the Berachain ecosystem.
            </p>
            <div className="error-actions">
              <button
                onClick={this.handleReset}
                className="error-reset-button"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="error-reload-button"
              >
                Reload Page
              </button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development)</summary>
                <pre className="error-stack">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
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

export default ErrorBoundary;