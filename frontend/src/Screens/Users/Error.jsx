import React from "react";
import { useLocation } from "react-router-dom";

function Error() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("messege");

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Oops! Something Went Wrong</h1>
      <p style={styles.message}>
        {message ? `Error: ${message}` : "An unknown error occurred."}
      </p>
      <p style={styles.instructions}>
        Please try refreshing the page or go back to the{" "}
        <a href="/" style={styles.link}>
          homepage
        </a>
        .
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f8f8",
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  message: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "15px",
  },
  instructions: {
    fontSize: "1rem",
    color: "#777",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Error;
