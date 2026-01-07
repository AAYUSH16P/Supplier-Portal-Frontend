import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import "../../style/RegisteredUser/SupplierApprovals.css";


export default function SupplierApprovals() {
  const navigate = useNavigate();
  const [certText, setCertText] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [slaFilter, setSlaFilter] = useState("All");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [showSlaConfirm, setShowSlaConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  // possible values: "APPROVE" | "REJECT" | "SIGN_SLA"
  const [confirmCompanyId, setConfirmCompanyId] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");



  const handleConfirmAction = async () => {
    try {
      if (confirmAction === "APPROVE") {
        await fetch(
          "https://sp-portal-backend-production.up.railway.app/api/company/approve",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyId: confirmCompanyId }),
          }
        );
      }

      if (confirmAction === "REJECT") {
        const remark = prompt("Enter rejection remark:");
        if (!remark) return;

        await fetch(
          "https://sp-portal-backend-production.up.railway.app/api/company/reject",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ companyId: confirmCompanyId, remark }),
          }
        );
      }

      if (confirmAction === "SIGN_SLA") {
        await fetch(
          `https://sp-portal-backend-production.up.railway.app/api/Supplier/${confirmCompanyId}/sign-sla`,
          { method: "POST" }
        );
      }

      // cleanup
      setShowSlaConfirm(false);
      setConfirmAction(null);
      setConfirmCompanyId(null);
      refreshSuppliers();

    } catch (err) {
      console.error("Action failed", err);
      alert("Operation failed");
    }
  };


  const ErrorText = ({ message }) =>
    message ? <div className="error-text">{message}</div> : null;


  const closeModal = () => {
    setSelectedSupplier(null);
    setIsEditMode(false);
    setEditForm(null);
  };

  const validateEditForm = (form) => {
    const e = {};

    // ===== COMPANY INFO =====
    if (!form.companyName?.trim())
      e.companyName = "Company name is required";

    if (!form.companyWebsite?.trim())
      e.companyWebsite = "Company website is required";
    else if (!/^https?:\/\/.+/i.test(form.companyWebsite))
      e.companyWebsite = "Enter a valid website URL";

    if (!form.businessType?.trim())
      e.businessType = "Business type is required";

    if (!form.companySize?.trim())
      e.companySize = "Company size is required";

    if (!form.yearEstablished || form.yearEstablished < 1900)
      e.yearEstablished = "Enter a valid year";

    if (!form.companyOverview?.trim())
      e.companyOverview = "Company overview is required";

    // ===== ADDRESS =====
    if (!form.address?.addressLine1?.trim())
      e.addressLine1 = "Address Line 1 is required";

    if (!form.address?.city?.trim())
      e.city = "City is required";

    if (!form.address?.state?.trim())
      e.state = "State is required";

    if (!form.address?.postalCode?.trim())
      e.postalCode = "Postal code is required";

    if (!form.address?.country?.trim())
      e.country = "Country is required";

    // ===== PRIMARY CONTACT =====
    if (!form.primaryContact?.contactName?.trim())
      e.primaryContactName = "Primary contact name is required";

    if (!form.primaryContact?.roleDesignation?.trim())
      e.primaryContactRole = "Designation is required";

    if (!form.primaryContact?.email?.trim())
      e.primaryContactEmail = "Primary email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.primaryContact.email))
      e.primaryContactEmail = "Invalid email address";

    if (!form.primaryContact?.phone?.trim())
      e.primaryContactPhone = "Primary phone number is required";

    // ===== OPTIONAL: SECONDARY CONTACT =====
    if (form.secondaryContact?.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.secondaryContact.email)) {
        e.secondaryContactEmail = "Invalid secondary email";
      }
    }

    return e;
  };



  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!editForm) return;
    setErrors(validateEditForm(editForm));
  }, [editForm]);



  const handleUpdateCompany = async () => {
    try {
      const payload = {
        ...editForm,
        certifications: certText
          .split(",")
          .map(c => c.trim())
          .filter(Boolean),
      };

      await fetch(
        `https://sp-portal-backend-production.up.railway.app/api/Supplier/${selectedSupplier.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      setIsEditMode(false);
      setSelectedSupplier(null);
      refreshSuppliers();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update company");
    }
  };




  /* =========================
     API CALL – ALL SUPPLIERS
  ========================== */
  useEffect(() => {
    fetch("https://sp-portal-backend-production.up.railway.app/api/company/admin/pending-companies")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error(err));
  }, []);


  const refreshSuppliers = () => {
    fetch("https://sp-portal-backend-production.up.railway.app/api/company/admin/pending-companies")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error(err));
  };

  // const handleApprove = async (companyId) => {
  //   try {
  //     await fetch("https://sp-portal-backend-production.up.railway.app/api/company/approve", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ companyId }),
  //     });

  //     refreshSuppliers();
  //   } catch (err) {
  //     console.error("Approve failed", err);
  //   }
  // };

  // const handleReject = async (companyId) => {
  //   const remark = prompt("Enter rejection remark:");
  //   if (!remark) return;

  //   try {
  //     await fetch("https://sp-portal-backend-production.up.railway.app/api/company/reject", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ companyId, remark }),
  //     });

  //     refreshSuppliers();
  //   } catch (err) {
  //     console.error("Reject failed", err);
  //   }
  // };

  // const confirmSignSla = async () => {
  //   try {
  //     await fetch(
  //       `https://sp-portal-backend-production.up.railway.app/api/Supplier/${slaCompanyId}/sign-sla`,
  //       { method: "POST" }
  //     );

  //     setShowSlaConfirm(false);
  //     setSlaCompanyId(null);
  //     refreshSuppliers();
  //   } catch (err) {
  //     console.error("Sign SLA failed", err);
  //     alert("Failed to sign SLA");
  //   }
  // };

  const cancelSignSla = () => {
    setShowSlaConfirm(false);

  };



  /* =========================
     SEARCH + FILTER LOGIC
  ========================== */
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const search =
        s.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
        s.contacts?.[0]?.email
          ?.toLowerCase()
          .includes(searchText.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        (statusFilter === "Pending" &&
          s.isApproved === false &&
          s.remark == null) ||
        (statusFilter === "Rejected" &&
          s.isApproved === false &&
          s.remark != null) ||
        (statusFilter === "Approved" &&
          s.isApproved === true);

      const slaMatch =
        slaFilter === "All" ||
        (slaFilter === "SLA Signed" && s.isSlaSigned === true) ||
        (slaFilter === "SLA Not Signed" && s.isSlaSigned === false);

      return search && statusMatch && slaMatch;
    });
  }, [suppliers, searchText, statusFilter, slaFilter]);


  /* =========================
     STATUS UI HELPERS
  ========================== */
  const getStatusBadge = (supplier) => {
    if (supplier.isApproved) {
      return <span className="badge approved">Approved</span>;
    }

    if (!supplier.isApproved && supplier.remark) {
      return <span className="badge rejected">Rejected</span>;
    }

    return <span className="badge pending">Pending</span>;
  };

  const getPrimaryContact = (supplier) =>
    supplier.contacts?.find(c => c.contactType === "PRIMARY");

  const getSecondaryContact = (supplier) =>
    supplier.contacts?.find(c => c.contactType === "SECONDARY");

  const mapSupplierToEditDto = (s) => {
    const primary = s.contacts?.find(c => c.contactType === "PRIMARY");
    const secondary = s.contacts?.find(c => c.contactType === "SECONDARY");
    const addr = s.addresses?.[0];

    return {
      companyName: s.companyName,
      companyWebsite: s.companyWebsite,
      businessType: s.businessType,
      companySize: s.companySize,
      yearEstablished: s.yearEstablished,
      companyOverview: s.companyOverview,
      totalProjectsExecuted: s.totalProjectsExecuted,
      domainExpertise: s.domainExpertise,

      address: addr
        ? {
          addressLine1: addr.addressLine1,
          addressLine2: addr.addressLine2,
          city: addr.city,
          state: addr.state,
          postalCode: addr.postalCode,
          country: addr.country,
        }
        : {},

      primaryContact: primary
        ? {
          contactName: primary.contactName,
          roleDesignation: primary.roleDesignation,
          email: primary.email,
          phone: primary.phone,
        }
        : {},

      secondaryContact: secondary
        ? {
          contactName: secondary.contactName,
          roleDesignation: secondary.roleDesignation,
          email: secondary.email,
          phone: secondary.phone,
        }
        : null,

      certifications: s.certifications.map(c => c.certificationName),
    };
  };


  const openViewModal = (supplier) => {
    setSelectedSupplier(supplier);
    setIsEditMode(false);
    setEditForm(null); // IMPORTANT
  };



  return (
    <>
      <AppHeader />

      <div className="app-shell">

        <main className="app-content supplier-approvals-page">
          {/* TOP BANNER */}
          <div className="approval-banner">
            🏢 Review & Approve Supplier Registrations
          </div>

          {/* NAV TABS */}
          <div className="approval-tabs">
            <button className="tab active">Supplier Approvals</button>

            <button
              className="tab"
              onClick={() => navigate("/candidate-validation")}
            >
              Candidate Validation
            </button>

            <button
              className="tab"
              onClick={() => navigate("/request-for-change")}
            >
              Request for Change
            </button>
          </div>

          {/* TITLE */}
          <h2 className="page-title">Supplier Approvals</h2>
          <p className="page-subtitle">
            Review and manage supplier registration requests
          </p>

          {/* SEARCH & FILTER BAR */}
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search by company name or email..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <select
              value={slaFilter}
              onChange={(e) => setSlaFilter(e.target.value)}
            >
              <option>All</option>
              <option>SLA Signed</option>
              <option>SLA Not Signed</option>
            </select>
          </div>

          {/* TABLE CARD */}
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Contact Email</th>
                  <th>Date Registered</th>
                  <th>Status</th>
                  <th>SLA</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No suppliers found
                    </td>
                  </tr>
                ) : (
                  filteredSuppliers.map((s) => (
                    <tr key={s.id}>
                      <td>{s.companyName}</td>
                      <td>{getPrimaryContact(s)?.email || "-"}</td>
                      <td>
                        {new Date(s.createdAt)
                          .toISOString()
                          .split("T")[0]}
                      </td>
                      <td>{getStatusBadge(s)}</td>
                      <td>
                        {s.isSlaSigned ? (
                          <span className="pill success">Signed</span>
                        ) : (
                          <span className="pill">Not Signed</span>
                        )}
                      </td>

                      <td className="actions">
                        {/* VIEW – always available */}
                        <button
                          className="view"
                          onClick={() => openViewModal(s)}
                        >
                          👁 View
                        </button>


                        <button
                          className="edit"
                          onClick={() => {
                            const dto = mapSupplierToEditDto(s);
                            setSelectedSupplier(s);
                            setEditForm(dto);
                            setCertText(dto.certifications.join(", "));
                            setIsEditMode(true);
                          }}
                        >
                          ✏ Edit
                        </button>






                        {/* PENDING: Approve + Reject */}
                        {!s.isApproved && s.remark == null && (
                          <>
                            <button
                              className="approve"
                              onClick={() => {
                                setConfirmAction("APPROVE");
                                setConfirmCompanyId(s.id);
                                setConfirmMessage("Are you sure you want to approve this supplier?");
                                setShowSlaConfirm(true);
                              }}
                            >
                              ✔ Approve
                            </button>


                            <button
                              className="reject"
                              onClick={() => {
                                setConfirmAction("REJECT");
                                setConfirmCompanyId(s.id);
                                setConfirmMessage("Are you sure you want to reject this supplier?");
                                setShowSlaConfirm(true);
                              }}
                            >
                              ✖ Reject
                            </button>

                          </>
                        )}

                        {/* APPROVED but SLA NOT signed */}
                        {s.isApproved && !s.isSlaSigned && (
                          <button
                            className="sla"
                            onClick={() => {
                              setConfirmAction("SIGN_SLA");
                              setConfirmCompanyId(s.id);
                              setConfirmMessage("Are you sure you want to sign the SLA for this supplier?");
                              setShowSlaConfirm(true);
                            }}
                          >
                            ✍ Sign SLA
                          </button>


                        )}

                        {/* REJECTED → NOTHING extra */}
                      </td>

                    </tr>
                  ))
                )}


                {selectedSupplier && (
                  <div className="admin-modal-overlay" onClick={closeModal}>
                    <div
                      className="admin-modal"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* HEADER */}
                      <div className="admin-modal-header">
                        <div>
                          <h2>{selectedSupplier.companyName}</h2>
                          <div className="meta-row">
                            {getStatusBadge(selectedSupplier)}
                            <span
                              className={`sla-pill ${selectedSupplier.isSlaSigned ? "signed" : "not-signed"
                                }`}
                            >
                              {selectedSupplier.isSlaSigned ? "SLA Signed" : "SLA Not Signed"}
                            </span>
                          </div>
                        </div>

                        <button
                          className="close-icon"
                          onClick={closeModal}
                        >
                          ✕
                        </button>
                      </div>

                      {/* BODY */}
                      <div className={`admin-modal-body ${isEditMode ? "edit-mode" : ""}`}>

                        {/* COMPANY DETAILS */}
                        <div className="section-card">
                          <h3>Company Details</h3>

                          <div className={isEditMode ? "edit-grid" : "kv-grid"}>
                            <div className={isEditMode ? "form-group" : ""}>

                              <label>Company Name</label>

                              {isEditMode ? (
                                <>
                                  <input
                                    value={editForm.companyName}
                                    onChange={(e) =>
                                      setEditForm({ ...editForm, companyName: e.target.value })
                                    }
                                  />
                                  <ErrorText message={errors.companyName} />
                                </>
                              ) : (
                                <span>{selectedSupplier.companyName}</span>
                              )}

                              <label>Website</label>
                              {isEditMode ? (
                                <>
                                  <input
                                    type="url"
                                    value={editForm.companyWebsite}
                                    onChange={(e) =>
                                      setEditForm({ ...editForm, companyWebsite: e.target.value })
                                    }
                                  />
                                  <ErrorText message={errors.companyWebsite} />
                                </>
                              )
                                : (
                                  <span>{selectedSupplier.companyWebsite}</span>
                                )}
                            </div>

                            <div className={isEditMode ? "form-group" : ""}>
                              <label>
                                Business Type {isEditMode && <span className="required-asterisk">*</span>}
                              </label>

                              {isEditMode ? (
                                <>
                                  <select
                                    value={editForm.businessType}
                                    onChange={(e) =>
                                      setEditForm({ ...editForm, businessType: e.target.value })
                                    }
                                    className={errors.businessType ? "error" : ""}
                                  >

                                    <option value="">Select business type...</option>
                                    <option value="Private Limited">Private Limited</option>
                                    <option value="Public Limited">Public Limited</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="LLP">LLP (Limited Liability Partnership)</option>
                                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                                    <option value="Other">Other</option>
                                  </select>

                                  <ErrorText message={errors.businessType} />
                                </>
                              ) : (
                                <span>{selectedSupplier.businessType || "-"}</span>
                              )}
                            </div>


                            <div className={isEditMode ? "form-group" : ""}>
                              <label>Company Size</label>
                              {isEditMode ? (
                                <>
                                  <select
                                    value={editForm.companySize}
                                    onChange={(e) =>
                                      setEditForm({ ...editForm, companySize: e.target.value })
                                    }
                                    className={errors.companySize ? "error" : ""}
                                  >
                                    <option value="">Select size...</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-500">201-500 employees</option>
                                    <option value="501-1000">501-1000 employees</option>
                                    <option value="1000+">1000+ employees</option>
                                  </select>
                                  <ErrorText message={errors.companySize} />

                                  <ErrorText message={errors.companySize} />
                                </>
                              ) : (
                                <span>{selectedSupplier.companySize}</span>
                              )}
                            </div>

                            <div className={isEditMode ? "form-group" : ""}>
                              <label>Established</label>
                              {isEditMode ? (
                                <>
                                  <input
                                    type="number"
                                    value={editForm.yearEstablished}
                                    onChange={(e) =>
                                      setEditForm({ ...editForm, yearEstablished: +e.target.value })
                                    }
                                  />
                                  <ErrorText message={errors.yearEstablished} />
                                </>
                              ) : (
                                <span>{selectedSupplier.yearEstablished}</span>
                              )}
                            </div>

                            <div className={isEditMode ? "form-group" : ""}>
                              <label>Total Projects Executed</label>
                              {isEditMode ? (
                                <input
                                  type="number"
                                  value={editForm.totalProjectsExecuted ?? ""}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      totalProjectsExecuted: e.target.value === "" ? null : +e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                <span>{selectedSupplier.totalProjectsExecuted ?? "—"}</span>
                              )}

                            </div>

                            {/* ✅ NEW FIELD */}
                            <div className={isEditMode ? "form-group" : ""}>
                              <label>Domain Expertise</label>
                              {isEditMode ? (
                                <input
                                  value={editForm.domainExpertise || ""}
                                  onChange={(e) =>
                                    setEditForm({ ...editForm, domainExpertise: e.target.value })
                                  }
                                />
                              ) : (
                                <span>{selectedSupplier.domainExpertise || "—"}</span>
                              )}

                            </div>

                          </div>

                          <label className="kv-ab">Company Overview: </label>

                          <div className={isEditMode ? "form-group full" : "description-box"}>

                            <span>
                              {isEditMode ? (
                                <>
                                  <textarea
                                    value={editForm.companyOverview}
                                    onChange={(e) =>
                                      setEditForm({ ...editForm, companyOverview: e.target.value })
                                    }
                                  />
                                  <ErrorText message={errors.companyOverview} />
                                </>
                              ) : (
                                <span>{selectedSupplier.companyOverview}</span>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* CONTACT */}
                        {/* CONTACTS */}
                        <div className="section-card">
                          <h3>Contacts</h3>

                          {/* PRIMARY */}
                          {getPrimaryContact(selectedSupplier) && (
                            <>
                              <h4 className="contact-label">Primary Contact</h4>

                              <div className={isEditMode ? "contact-edit-grid" : "contact-row"}>
                                <div className="avatar">
                                  {getPrimaryContact(selectedSupplier).contactName.charAt(0)}
                                </div>

                                <div>
                                  {isEditMode ? (
                                    <div className="contact-edit-grid">
                                      <div className="field">
                                        <label>Name</label>

                                        <input
                                          value={editForm.primaryContact.contactName}
                                          onChange={(e) =>
                                            setEditForm({
                                              ...editForm,
                                              primaryContact: {
                                                ...editForm.primaryContact,
                                                contactName: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                        <ErrorText message={errors.primaryContactName} />

                                      </div>

                                      <div className="field">
                                        <label>Designation</label>
                                        <input
                                          value={editForm.primaryContact.roleDesignation}
                                          onChange={(e) =>
                                            setEditForm({
                                              ...editForm,
                                              primaryContact: {
                                                ...editForm.primaryContact,
                                                roleDesignation: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                        <ErrorText message={errors.primaryContactRole} />

                                      </div>

                                      <div className="field">
                                        <label>Email</label>
                                        <input
                                          type="tel"
                                          value={editForm.primaryContact.phone}
                                          onChange={(e) =>
                                            setEditForm({
                                              ...editForm,
                                              primaryContact: {
                                                ...editForm.primaryContact,
                                                phone: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                        <ErrorText message={errors.primaryContactEmail} />

                                      </div>

                                      <div className="field">
                                        <label>Phone</label>
                                        <input
                                          value={editForm.primaryContact.phone}
                                          onChange={(e) =>
                                            setEditForm({
                                              ...editForm,
                                              primaryContact: {
                                                ...editForm.primaryContact,
                                                phone: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                        <ErrorText message={errors.primaryContactPhone} />
                                      </div>
                                    </div>

                                  ) : (
                                    <>
                                      <strong>{getPrimaryContact(selectedSupplier).contactName}</strong>
                                      <p>{getPrimaryContact(selectedSupplier).roleDesignation}</p>
                                      <p>{getPrimaryContact(selectedSupplier).email}</p>
                                      <p>{getPrimaryContact(selectedSupplier).phone}</p>
                                    </>
                                  )}

                                </div>
                              </div>
                            </>
                          )}




                          {/* SECONDARY */}
                          {getSecondaryContact(selectedSupplier) && (
                            <>
                              <h4 className="contact-label secondary">Secondary Contact</h4>

                              <div className={isEditMode ? "contact-edit-grid" : "contact-row secondary"}>
                                <div className="avatar">
                                  {getSecondaryContact(selectedSupplier).contactName.charAt(0)}
                                </div>

                                <div>
                                  {isEditMode ? (
                                    <div className="contact-edit-grid">
                                      <div className="field">
                                        <label>Name</label>
                                        <input
                                          value={editForm.secondaryContact?.contactName || ""}
                                          onChange={(e) =>
                                            setEditForm({
                                              ...editForm,
                                              secondaryContact: {
                                                ...(editForm.secondaryContact || {}),
                                                contactName: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                      </div>

                                      <div className="field">
                                        <label>Designation</label>
                                        <input
                                          value={editForm.secondaryContact?.roleDesignation || ""}
                                          onChange={(e) =>
                                            setEditForm({
                                              ...editForm,
                                              secondaryContact: {
                                                ...(editForm.secondaryContact || {}),
                                                roleDesignation: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                      </div>

                                      <div className="field">
                                        <label>Email</label>
                                        <input
                                          type="email"
                                          value={editForm.secondaryContact?.email || ""}
                                          onChange={(e) =>
                                            setEditForm({
                                              ...editForm,
                                              secondaryContact: {
                                                ...(editForm.secondaryContact || {}),
                                                email: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                      </div>

                                      <div className="field">
                                        <label>Phone</label>
                                        <input
                                          type="tel"
                                          value={editForm.secondaryContact?.phone || ""}
                                          onChange={(e) =>
                                            setEditForm({
                                              ...editForm,
                                              secondaryContact: {
                                                ...(editForm.secondaryContact || {}),
                                                phone: e.target.value,
                                              },
                                            })
                                          }
                                        />
                                      </div>
                                    </div>

                                  ) : (
                                    <>
                                      <strong>{getSecondaryContact(selectedSupplier).contactName}</strong>
                                      <p>{getSecondaryContact(selectedSupplier).roleDesignation}</p>
                                      <p>{getSecondaryContact(selectedSupplier).email}</p>
                                      <p>{getSecondaryContact(selectedSupplier).phone}</p>
                                    </>
                                  )}

                                </div>
                              </div>
                            </>
                          )}
                        </div>


                        {/* ADDRESS */}
                        <div className="section-card">
                          <h3>Address</h3>

                          {isEditMode ? (
                            <div className="address-edit-grid">
                              <div className="field">
                                <label>Address Line 1</label>
                                <input
                                  value={editForm.address.addressLine1}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      address: { ...editForm.address, addressLine1: e.target.value },
                                    })
                                  }
                                />
                                <ErrorText message={errors.addressLine1} />
                              </div>

                              <div className="field">
                                <label>Address Line 2</label>
                                <input
                                  value={editForm.address.addressLine2}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      address: { ...editForm.address, addressLine2: e.target.value },
                                    })
                                  }
                                />
                              </div>

                              <div className="field">
                                <label>City</label>
                                <input
                                  value={editForm.address.city}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      address: { ...editForm.address, city: e.target.value },
                                    })
                                  }
                                />
                                <ErrorText message={errors.city} />

                              </div>

                              <div className="field">
                                <label>State</label>
                                <input
                                  value={editForm.address.state}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      address: { ...editForm.address, state: e.target.value },
                                    })
                                  }
                                />
                                <ErrorText message={errors.state} />

                              </div>

                              <div className="field">
                                <label>Postal Code</label>
                                <input
                                  value={editForm.address.postalCode}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      address: { ...editForm.address, postalCode: e.target.value },
                                    })
                                  }
                                />
                                <ErrorText message={errors.postalCode} />

                              </div>

                              <div className="field">
                                <label>Country</label>
                                <select
                                id="edf"
                                  value={editForm.address.country}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      address: { ...editForm.address, country: e.target.value },
                                    })
                                  }
                                  className={errors.country ? "error" : ""}
                                >
                                  <option value="India">India</option>
                                  <option value="Other">Other</option>
                                </select>
                                <ErrorText message={errors.country} />

                                <ErrorText message={errors.country} />

                              </div>
                            </div>
                          ) : (
                            selectedSupplier.addresses.map((a, i) => (
                              <p key={i} className="address-text">
                                {a.addressLine1}, {a.addressLine2}<br />
                                {a.city}, {a.state} – {a.postalCode}, {a.country}
                              </p>
                            ))
                          )}

                        </div>

                        {/* CERTIFICATIONS */}
                        <div className="section-card">
                          <h3>Certifications</h3>

                          <div className={isEditMode ? "form-group" : "cert-row"}>
                            {isEditMode ? (
                              <input
                                placeholder="Comma separated certifications"
                                value={certText}
                                onChange={(e) => setCertText(e.target.value)}
                              />





                            ) : (
                              selectedSupplier.certifications.map((c, i) => (
                                <span key={i} className="cert-pill">{c.certificationName}</span>
                              ))
                            )}



                            {isEditMode && (
                              <div className="modal-footer">
                                <button className="btn cancel" onClick={closeModal}>
                                  Cancel
                                </button>

                                <button
                                  className="btn save"
                                  id="abchd"
                                  onClick={handleUpdateCompany}
                                  disabled={Object.keys(errors).length > 0}
                                >
                                  💾 Save Changes
                                </button>
                              </div>

                            )}

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}



              </tbody>
            </table>
          </div>
          {showSlaConfirm && (
            <div className="admin-modal-overlay" onClick={cancelSignSla}>
              <div
                className="admin-modal confirm-sla-modal"
                onClick={(e) => e.stopPropagation()}
              >
                {/* HEADER */}
                <div className="confirm-header">
                  <h2>Confirm SLA Signing</h2>
                  <button className="close-icon" onClick={cancelSignSla}>✕</button>
                </div>

                {/* BODY */}
                <div className="confirm-body">
                  <div className="confirm-icon">📄</div>

                  <p className="confirm-text">{confirmMessage}</p>

                  <p className="confirm-subtext">
                    This action requires administrator confirmation.
                  </p>
                </div>

                {/* FOOTER */}
                <div className="confirm-footer">
                  <button className="btn cancel" onClick={cancelSignSla}>
                    Cancel
                  </button>

                  <button className="btn confirm" id="abc" onClick={handleConfirmAction}>
                    ✔ Confirm
                  </button>

                </div>
              </div>
            </div>
          )}


        </main>
      </div>
    </>
  );
}
