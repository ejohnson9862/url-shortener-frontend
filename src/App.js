import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/shorten", { originalUrl });
      setShortUrl(response.data.shortUrl);
      setCopied(false);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div style={styles.container}>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Shorten</button>
      </form>

      {shortUrl && (
        <div style={styles.result}>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
            {shortUrl}
          </a>
          <button onClick={handleCopy} style={styles.copyButton}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

// Styling
const styles = {
  container: { textAlign: "center", marginTop: "50px", fontFamily: "Arial, sans-serif" },
  form: { marginTop: "20px" },
  input: { width: "300px", padding: "10px", marginRight: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px 20px", borderRadius: "5px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" },
  result: { marginTop: "20px", padding: "10px", background: "#f3f3f3", borderRadius: "5px", display: "inline-block" },
  link: { display: "block", marginTop: "10px", color: "#007bff", textDecoration: "none" },
  copyButton: { marginTop: "10px", padding: "5px 10px", borderRadius: "5px", background: "#28a745", color: "#fff", border: "none", cursor: "pointer" }
};

export default App;
