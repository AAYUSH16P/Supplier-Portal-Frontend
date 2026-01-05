export default function SupplierViewModal({
    supplier,
    onClose,
    footerActions,
  }) {
    if (!supplier) return null;
  
    return (
      <div className="admin-modal-overlay" onClick={onClose}>
        <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
          {/* HEADER */}
          <div className="admin-modal-header">
            <div>
              <h2>{supplier.companyName}</h2>
              <div className="meta-row">
                {supplier.isApproved ? (
                  <span className="badge approved">Approved</span>
                ) : supplier.remark ? (
                  <span className="badge rejected">Rejected</span>
                ) : (
                  <span className="badge pending">Pending</span>
                )}
  
                {supplier.isSlaSigned !== undefined && (
                  <span
                    className={`sla-pill ${
                      supplier.isSlaSigned ? "signed" : "not-signed"
                    }`}
                  >
                    {supplier.isSlaSigned ? "SLA Signed" : "SLA Not Signed"}
                  </span>
                )}
              </div>
            </div>
  
            <button className="close-icon" onClick={onClose}>✕</button>
          </div>
  
          {/* BODY */}
          <div className="admin-modal-body">
            <div className="section-card">
              <h3>Company Details</h3>
  
              <div className="kv-grid">
                <div>
                  <label>Company Name</label>
                  <span>{supplier.companyName}</span>
                </div>
  
                <div>
                  <label>Website</label>
                  <span>{supplier.companyWebsite || "-"}</span>
                </div>
  
                <div>
                  <label>Business Type</label>
                  <span>{supplier.businessType || "-"}</span>
                </div>
  
                <div>
                  <label>Company Size</label>
                  <span>{supplier.companySize || "-"}</span>
                </div>
  
                <div>
                  <label>Established</label>
                  <span>{supplier.yearEstablished || "-"}</span>
                </div>
  
                <div>
                  <label>Domain Expertise</label>
                  <span>{supplier.domainExpertise || "-"}</span>
                </div>
              </div>
  
              <label className="kv-ab">Company Overview</label>
              <div className="description-box">
                {supplier.companyOverview || "-"}
              </div>
            </div>
  
            {supplier.addresses?.length > 0 && (
              <div className="section-card">
                <h3>Address</h3>
                {supplier.addresses.map((a, i) => (
                  <p key={i} className="address-text">
                    {a.addressLine1}, {a.addressLine2}<br />
                    {a.city}, {a.state} – {a.postalCode}, {a.country}
                  </p>
                ))}
              </div>
            )}
          </div>
  
          {/* FOOTER (optional) */}
          {footerActions && (
            <div className="admin-modal-footer">
              {footerActions}
            </div>
          )}
        </div>
      </div>
    );
  }
  