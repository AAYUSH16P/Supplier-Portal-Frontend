import { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      await fetch(
        "https://sp-portal-backend-production.up.railway.app/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      // SECURITY: always show success
      toast.success("If the email exists, a reset link has been sent.");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <main className="login-container">
        <h1>Forgot Password</h1>
        <p className="subtitle">
          Enter your registered email to receive a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-card">
            <label>Email Address</label>
            <div className="input-box">
              <span>📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@company.com"
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
