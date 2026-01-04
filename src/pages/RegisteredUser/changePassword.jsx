import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../../style/RegisteredUser/MyCompanyDetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const getSupplierIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.companyId;
  } catch {
    return null;
  }
};

export default function ChangePasswordModal({ open, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null; // ⬅️ important

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    const supplierId = getSupplierIdFromToken();
    if (!supplierId) {
      setPasswordError("Session expired. Please login again.");
      return;
    }

    setLoading(true);
    setPasswordError("");

    try {
      const res = await fetch(
        `https://sp-portal-backend-production.up.railway.app/api/Supplier/${supplierId}/set-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify({
            currentPassword,
            password: newPassword,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Current password is incorrect");
      }

      toast.success("Password changed successfully");

      // reset + close
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card password-modal">
        <div className="modal-header">
          <h3>Change Password</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="form-group">
            <label>Re-type New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type new password"
            />
          </div>
        </div>

        {passwordError && (
          <p className="error-text" style={{ textAlign: "center" }}>
            {passwordError}
          </p>
        )}

        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn-primary"
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
