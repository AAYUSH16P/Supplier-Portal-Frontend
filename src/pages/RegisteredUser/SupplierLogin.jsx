import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { companyLogin } from "../../services/auth";
import "../../style/RegisteredUser/SupplierLogin.css";
import "../../style/RegisteredUser/sidebar.css";
import { jwtDecode } from "jwt-decode";

import ChangePasswordModal from "./changePassword";



export default function SupplierLogin() {
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);

  const [showChangePassword, setShowChangePassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigateAfterLogin = (decoded) => {
    const isAcknowledged =
      decoded?.isacknowledge === true ||
      decoded?.isacknowledge === "True";
  
    setTimeout(() => {
      if (isAcknowledged) {
        navigate("/home");
      } else {
        navigate("/acknowledge");
      }
    }, 500);
  };
  

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= VALIDATION ================= */

  const validateEmail = (email) => {
    if (!email.trim()) return "Email Address is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") error = validateEmail(value);
    if (name === "password") error = validatePassword(value);

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await companyLogin(
        formData.email,
        formData.password
      );

      if (response.status === 200 && response.data?.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        // Decode token
        let decoded;
        try {
          decoded = jwtDecode(token);
          setDecodedToken(decoded);
        } catch {
          throw new Error("Invalid token received");
        }

        // Optional API call
        // try {
        //   await getAdminAvailability("ayush@westgateithub.com");
        // } catch (err) {
        //   console.error("Admin availability failed", err);
        // }

        toast.success("Login successful!", { autoClose: 1500 });

        if (decoded?.isPasswordChanged === "False") {
          setShowChangePassword(true);
          return; // ⛔ stop navigation
        }

        navigateAfterLogin(decoded);
        // Normal flow
       


      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";

      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="login-page">
      <ToastContainer />

      {/* 🔐 CHANGE PASSWORD MODAL */}
      <ChangePasswordModal
        open={showChangePassword}
        onClose={() => {
          setShowChangePassword(false);
          navigateAfterLogin(decodedToken); // allow cancel + continue
        }}
      />

      <header className="login-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          Supplier Login
        </button>

        <div className="brand-center">
        <img
    src="/TSlogoFinal.jpg"
    alt="TalentedStaff"
    className="header-logo-img"
  />
        </div>

        <div className="header-spacer" />
      </header>

      <main className="login-container">
        <h1>Supplier Portal Login</h1>
        <p className="subtitle">
          Access your portal to manage candidates and track submissions
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-card">
            <label>Email Address</label>
            <div className={`input-box ${errors.email ? "error" : ""}`}>
              <span>📧</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="arif@talentedstaff.com"
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}

            <label>Password</label>
<div className={`input-box ${errors.password ? "error" : ""}`}>
  <span>🔒</span>

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    onBlur={handleBlur}
    placeholder="••••••"
  />

  <button
    type="button"
    className="eye-btn"
    onClick={() => setShowPassword((prev) => !prev)}
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? "🔒" : "👁️"}
  </button>
</div>


            <div className="forgot-row">
  <button
    type="button"
    className="forgot-btn"
    onClick={() => navigate("/forgot-password")}
  >
    Forgot Password?
  </button>
</div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "➜ Login to Portal"}
            </button>

            <p className="register">
              Don’t have an account?{" "}
              <button
                className="rgstr"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/registration");
                }}
              >
                Register as a new supplier
              </button>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
