import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/stay.png";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle login submit with API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://api.stayfinderindia.net/api/v1/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();

      // ⚡ Adjust based on your backend response shape
      const token = data?.token || data?.data?.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={formBox}>
        {/* ✅ Logo */}
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <img
            src={logo}
            alt="App Logo"
            style={{ width: "100px", marginBottom: "10px" }}
          />
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        {/* ✅ Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* ✅ Password with toggle */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ ...inputStyle, paddingRight: "35px" }}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} style={eyeIcon}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" style={btnStyle} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

/* ✅ Styles */
const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontFamily: "'Poppins', sans-serif",
  background: "linear-gradient(to right, #667eea, #764ba2)",
};

const formBox = {
  background: "#fff",
  padding: "30px",
  borderRadius: "8px",
  width: "320px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
  width: "100%",
};

const eyeIcon = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#555",
  fontSize: "16px",
};

const btnStyle = {
  padding: "10px",
  background: "#4b5e9b",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  cursor: "pointer",
};

export default Login;
