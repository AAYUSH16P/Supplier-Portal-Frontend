import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { companyLogin } from "../../services/auth";
import { getAdminAvailability } from "../../services/calendar";
import "../../style/RegisteredUser/SupplierLogin.css";
import "../../style/RegisteredUser/sidebar.css"

export default function SupplierLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email Address is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await companyLogin(formData.email, formData.password);

      // Handle successful login (status 200)
      if (response.status === 200 && response.data) {
        // Store token if provided
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // Store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        // Call admin availability API after successful login
        try {
          await getAdminAvailability("ayush@westgateithub.com");
        } catch (availabilityError) {
          // Log error but don't block login flow
          console.error("Failed to fetch admin availability:", availabilityError);
        }

        // Show success toast
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Navigate to acknowledgement page after a short delay
        setTimeout(() => {
          navigate("/acknowledge");
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed. Please check your credentials and try again.";
      
      // Show error toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <header className="login-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          Supplier Login
        </button>

        <div className="brand-center">
          <div className="brand-icon">🏢</div>
          <span>WestGate</span>
        </div>

        {/* Spacer to keep center alignment */}
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
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}

            <label>Password</label>
            <div className={`input-box ${errors.password ? "error" : ""}`}>
              <span>🔒</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••"
              />
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}

            <div className="login-options">
             

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "➜ Login to Portal"}
            </button>

            <p className="register">
              Don't have an account?{" "}
              <button className="rgstr"
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

        <div className="demo-box">
          <strong>Demo Login:</strong> Use any valid email format
          <br />
          <small>Example: demo@company.com with any password</small>
        </div>
      </main>
    </div>
  );
}
