import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // 👁 Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ================= VALIDATION ================= */

  const passwordsMatch = password === confirm;
  const isLengthValid = password.length >= 6;
  const isValid = password && confirm && passwordsMatch && isLengthValid;

  let errorMessage = "";
  if (!password && !confirm) {
    errorMessage = "Password is required";
  } else if (password.length > 0 && password.length < 6) {
    errorMessage = "Password must be at least 6 characters";
  } else if (confirm && !passwordsMatch) {
    errorMessage = "Passwords do not match";
  }

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      await fetch(
        "https://sp-portal-backend-production.up.railway.app/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: password }),
        }
      );

      toast.success("Password reset successfully");
      navigate("/login");
    } catch {
      toast.error("Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <p style={{ padding: 24 }}>Invalid reset link</p>;
  }

  /* ================= UI ================= */

  return (
    <div className="login-page">
      <main className="login-container">
        <h1>Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="login-card">

            {/* NEW PASSWORD */}
            <label>New Password</label>
            <div className="input-box">
              <span>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "✕" : "👁"}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <label>Confirm Password</label>
            <div className="input-box">
              <span>🔒</span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "✕" : "👁"}
              </button>
            </div>

            {/* ERROR MESSAGE */}
            {!isValid && (password || confirm) && (
              <p className="error-message">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading || !isValid}
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>

          </div>
        </form>
      </main>
    </div>
  );
}
