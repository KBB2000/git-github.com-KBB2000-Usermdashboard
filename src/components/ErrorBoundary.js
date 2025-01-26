import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleRetry = () => {
    setHasError(false);
    setError(null);
    setErrorInfo(null);
  };

  if (hasError) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
          {error && error.toString()}
          <br />
          {errorInfo?.componentStack}
        </details>
        <button
          onClick={handleRetry}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
