import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/admin/AdminLogin.css";


export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "aayush" && password === "westGateItHub") {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/supplierApprovals");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <input
  placeholder="Admin Email"
  value={email}
  required
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  required
  onChange={(e) => setPassword(e.target.value)}
/>


        <button type="submit">Login</button>
      </form>
    </div>
  );
}
