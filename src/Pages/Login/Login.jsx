import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("currentUser", username);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>Iniciar Sesión</h2>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="login-actions">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
