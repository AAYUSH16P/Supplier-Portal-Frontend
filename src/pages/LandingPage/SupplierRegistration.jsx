import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header02";
import Sidebar from "../../Components/Sidebar";
import { registerCompany } from "../../services/company";
import { mapCompanyPayload } from "../../utils/companyMapper";
import "../../style/LandingPage/SupplierRegistration.css";
import LandingFooter from "../../Components/LandingFooter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function SupplierRegistration() {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    businessType: "",
    companySize: "",
    yearEstablished: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    primaryContactName: "",
    primaryContactRole: "",
    primaryContactEmail: "",
    primaryContactNumber: "",
    secondaryContactName: "",
    secondaryContactRole: "",
    secondaryContactEmail: "",
    secondaryContactPhone: "",
    companyOverview: "",
    domainExpertise: "",
    totalProjectsExecuted: "",

  });

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "companyName":
        if (!value.trim()) {
          error = "Company Name is required";
        }
        break;

      case "companyWebsite":
        if (!value.trim()) {
          error = "Company Website is required";
        } else if (!/^https?:\/\/.+/.test(value)) {
          error = "Please enter a valid website URL";
        }
        break;

      case "businessType":
        if (!value || value === "Select business type..." || value === "") {
          error = "Business Type is required";
        }
        break;

      case "companySize":
        if (!value || value === "Select size..." || value === "") {
          error = "Company Size is required";
        }
        break;

      case "yearEstablished":
        if (!value.trim()) {
          error = "Year Established is required";
        } else if (!/^\d{4}$/.test(value)) {
          error = "Please enter a valid year (YYYY)";
        }
        break;

      case "addressLine1":
        if (!value.trim()) {
          error = "Address Line 1 is required";
        }
        break;

      case "city":
        if (!value.trim()) {
          error = "City is required";
        }
        break;

      case "state":
        if (!value.trim()) {
          error = "State is required";
        }
        break;

      case "postalCode":
        if (!value.trim()) {
          error = "Postal Code is required";
        }
        break;

      case "country":
        if (!value || value === "Select country..." || value === "") {
          error = "Country is required";
        }
        break;

      case "primaryContactName":
        if (!value.trim()) {
          error = "Primary Contact Name is required";
        }
        break;

      case "primaryContactRole":
        if (!value.trim()) {
          error = "Primary Contact Role is required";
        }
        break;

      case "primaryContactEmail":
        if (!value.trim()) {
          error = "Primary Contact Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "primaryContactNumber":
        if (!value.trim()) {
          error = "Primary Contact Number is required";
        } else if (!/^[\d\s+()-]{7,15}$/.test(value)) {
          error = "Please enter a valid phone number";
        }
        break;



      case "companyOverview":
        if (!value.trim()) {
          error = "Company Overview is required";
        } else if (value.trim().length < 50) {
          error = "Company Overview must be at least 50 characters";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field in real-time (only if field has been touched or has existing error)
    if (errors[name] || value.trim() !== "") {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Handle blur event - validate when user leaves the field
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    }

    if (!formData.companyWebsite.trim()) {
      newErrors.companyWebsite = "Company Website is required";
    } else if (!/^https?:\/\/.+/.test(formData.companyWebsite)) {
      newErrors.companyWebsite = "Please enter a valid website URL";
    }

    if (!formData.businessType || formData.businessType === "Select business type...") {
      newErrors.businessType = "Business Type is required";
    }

    if (!formData.companySize || formData.companySize === "Select size...") {
      newErrors.companySize = "Company Size is required";
    }

    if (!formData.yearEstablished.trim()) {
      newErrors.yearEstablished = "Year Established is required";
    } else if (!/^\d{4}$/.test(formData.yearEstablished)) {
      newErrors.yearEstablished = "Please enter a valid year (YYYY)";
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address Line 1 is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    }

    if (!formData.country || formData.country === "Select country...") {
      newErrors.country = "Country is required";
    }

    if (!formData.primaryContactName.trim()) {
      newErrors.primaryContactName = "Primary Contact Name is required";
    }

    if (!formData.primaryContactRole.trim()) {
      newErrors.primaryContactRole = "Primary Contact Role is required";
    }

    if (!formData.primaryContactEmail.trim()) {
      newErrors.primaryContactEmail = "Primary Contact Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryContactEmail)) {
      newErrors.primaryContactEmail = "Please enter a valid email address";
    }

    if (!formData.primaryContactNumber.trim()) {
      newErrors.primaryContactNumber = "Primary Contact Number is required";
    } else if (!/^[\d\s+()-]+$/.test(formData.primaryContactNumber)) {
      newErrors.primaryContactNumber = "Please enter a valid phone number";
    }


    if (!formData.companyOverview.trim()) {
      newErrors.companyOverview = "Company Overview is required";
    } else if (formData.companyOverview.trim().length < 50) {
      newErrors.companyOverview = "Company Overview must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.companyName.trim() &&
      formData.companyWebsite.trim() &&
      formData.businessType &&
      formData.businessType !== "Select business type..." &&
      formData.companySize &&
      formData.companySize !== "Select size..." &&
      formData.yearEstablished.trim() &&
      formData.addressLine1.trim() &&
      formData.city.trim() &&
      formData.state.trim() &&
      formData.postalCode.trim() &&
      formData.country &&
      formData.country !== "Select country..." &&
      formData.primaryContactName.trim() &&
      formData.primaryContactRole.trim() &&
      formData.primaryContactEmail.trim() &&
      formData.primaryContactNumber.trim() &&
      formData.companyOverview.trim() &&
      formData.companyOverview.trim().length >= 50 &&
      /^https?:\/\/.+/.test(formData.companyWebsite) &&
      /^\d{4}$/.test(formData.yearEstablished) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryContactEmail) &&
      /^[\d\s+()-]{7,15}$/.test(formData.primaryContactNumber)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Build nested payload structure (frontend form state remains nested)
      const nestedPayload = {
        companyName: formData.companyName.trim(),
        companyWebsite: formData.companyWebsite.trim(),
        businessType: formData.businessType,
        companySize: formData.companySize,
        yearEstablished: parseInt(formData.yearEstablished, 10),
        companyOverview: formData.companyOverview.trim(),
        domainExpertise: formData.domainExpertise.trim(),
        totalProjectsExecuted: formData.totalProjectsExecuted
          ? parseInt(formData.totalProjectsExecuted, 10)
          : null,
        address: {
          addressLine1: formData.addressLine1.trim(),
          addressLine2: formData.addressLine2.trim(), // Always include, even if empty
          city: formData.city.trim(),
          state: formData.state.trim(),
          postalCode: formData.postalCode.trim(),
          country: formData.country,
        },
        primaryContact: {
          name: formData.primaryContactName.trim(),
          role: formData.primaryContactRole.trim(),
          email: formData.primaryContactEmail.trim(),
          phone: formData.primaryContactNumber.trim(),
        },
        secondaryContact: {
          name: formData.secondaryContactName.trim(),
          role: formData.secondaryContactRole.trim(),
          email: formData.secondaryContactEmail.trim(),
          phone: formData.secondaryContactPhone.trim(),
        },
        certifications: certifications.filter((cert) => cert && cert.trim() !== ""),
      };

      // Map nested payload to flat backend DTO format
      const flatPayload = mapCompanyPayload(nestedPayload);

      // Send flat payload to API
      const response = await registerCompany(flatPayload);

      // Handle success
      if (response.data) {
        toast.success(
          "Registration submitted successfully! We will review your application.",
          {
            position: "top-right",
            autoClose: 4000,
          }
        );
        navigate("/landingPage");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to submit registration. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const addCertification = () => {
    setCertifications([...certifications, ""]);
  };

  const removeCertification = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated.length > 0 ? updated : [""]);
  };

  const updateCertification = (index, value) => {
    const updated = [...certifications];
    updated[index] = value;
    setCertifications(updated);
  };

  return (
    <>
      <Header />

      <div className="layout">
        <Sidebar active="registration" />

        <main className="supplier-registration-wrapper">
          <div className="supplier-registration-page">
            <section className="reg-hero">
              <h1>Supplier Registration – Westgate IT Hub Portal</h1>
              <p>Complete your registration to join our supplier network</p>
            </section>

            <div className="reg-top-strip">
              📝 Complete Your Registration – Join the TalentedStaff Network
            </div>

            <section className="reg-info-card">
              <h4>ℹ️ Welcome to Westgate IT Hub Supplier Registration</h4>
              <p>
                Complete this registration form to become a registered supplier
                with Westgate IT Hub. We connect IT suppliers with UK
                opportunities for resource augmentation and project staffing.
              </p>
              <p>
                Once approved, you'll be able to upload candidate profiles and
                manage your resource pool through our portal.
              </p>
            </section>

            <section className="reg-form-card">
              <form onSubmit={handleSubmit}>
                <h3>🏢 Company Information</h3>

                <div className="form-grid">
                  <div className="form-group full">
                    <label>Company Name <span className="required-asterisk">*</span></label>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="TechCorp Solutions Pvt Ltd"
                      className={errors.companyName ? "error" : ""}
                    />
                    {errors.companyName && (
                      <span className="error-message">{errors.companyName}</span>
                    )}
                  </div>

                  <div className="form-group full">
                    <label>Company Website <span className="required-asterisk">*</span></label>
                    <input
                      name="companyWebsite"
                      type="url"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="https://www.company.com"
                      className={errors.companyWebsite ? "error" : ""}
                    />
                    {errors.companyWebsite && (
                      <span className="error-message">{errors.companyWebsite}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Business Type <span className="required-asterisk">*</span></label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    {errors.businessType && (
                      <span className="error-message">{errors.businessType}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Company Size <span className="required-asterisk">*</span></label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    {errors.companySize && (
                      <span className="error-message">{errors.companySize}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Year Established <span className="required-asterisk">*</span></label>
                    <input
                      name="yearEstablished"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.yearEstablished}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="2010"
                      className={errors.yearEstablished ? "error" : ""}
                    />
                    {errors.yearEstablished && (
                      <span className="error-message">{errors.yearEstablished}</span>
                    )}
                  </div>
                </div>

                <h4 className="form-section-title">📍 Company Address</h4>

                <div className="form-grid">
                  <div className="form-group full">
                    <label>Address Line 1 <span className="required-asterisk">*</span></label>
                    <input
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Building / Street name"
                      className={errors.addressLine1 ? "error" : ""}
                    />
                    {errors.addressLine1 && (
                      <span className="error-message">{errors.addressLine1}</span>
                    )}
                  </div>

                  <div className="form-group full">
                    <label>Address Line 2</label>
                    <input
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      placeholder="Suite / Floor (optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label>City <span className="required-asterisk">*</span></label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Bangalore"
                      className={errors.city ? "error" : ""}
                    />
                    {errors.city && (
                      <span className="error-message">{errors.city}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>State <span className="required-asterisk">*</span></label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Karnataka"
                      className={errors.state ? "error" : ""}
                    />
                    {errors.state && (
                      <span className="error-message">{errors.state}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Postal Code <span className="required-asterisk">*</span></label>
                    <input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="560001"
                      className={errors.postalCode ? "error" : ""}
                    />
                    {errors.postalCode && (
                      <span className="error-message">{errors.postalCode}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Country <span className="required-asterisk">*</span></label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.country ? "error" : ""}
                    >
                      <option value="India">India</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.country && (
                      <span className="error-message">{errors.country}</span>
                    )}
                  </div>
                </div>

                <h4 className="form-section-title">
                  👤 Primary Contact Information
                </h4>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Primary Contact Name <span className="required-asterisk">*</span></label>
                    <input
                      name="primaryContactName"
                      value={formData.primaryContactName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Jane Smith"
                      className={errors.primaryContactName ? "error" : ""}
                    />
                    {errors.primaryContactName && (
                      <span className="error-message">{errors.primaryContactName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Primary Contact Role / Designation <span className="required-asterisk">*</span></label>
                    <input
                      name="primaryContactRole"
                      value={formData.primaryContactRole}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Operations Manager"
                      className={errors.primaryContactRole ? "error" : ""}
                    />
                    {errors.primaryContactRole && (
                      <span className="error-message">{errors.primaryContactRole}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Primary Contact Email <span className="required-asterisk">*</span></label>
                    <input
                      name="primaryContactEmail"
                      type="email"
                      value={formData.primaryContactEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="contact@company.com"
                      className={errors.primaryContactEmail ? "error" : ""}
                    />
                    {errors.primaryContactEmail && (
                      <span className="error-message">{errors.primaryContactEmail}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Primary Contact Number <span className="required-asterisk">*</span></label>
                    <input
                      name="primaryContactNumber"
                      type="tel"
                      value={formData.primaryContactNumber}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={errors.primaryContactNumber ? "error" : ""}
                    />
                    {errors.primaryContactNumber && (
                      <span className="error-message">{errors.primaryContactNumber}</span>
                    )}
                  </div>
                </div>

                <h4 className="form-section-title">
                  👥 Secondary Contact Information
                </h4>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Secondary Contact Name</label>
                    <input
                      name="secondaryContactName"
                      value={formData.secondaryContactName}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label>Secondary Contact Role / Designation</label>
                    <input
                      name="secondaryContactRole"
                      value={formData.secondaryContactRole}
                      onChange={handleChange}
                      placeholder="Business Development Manager"
                    />
                  </div>

                  <div className="form-group">
                    <label>Secondary Contact Email</label>
                    <input
                      name="secondaryContactEmail"
                      type="email"
                      value={formData.secondaryContactEmail}
                      onChange={handleChange}
                      placeholder="john.doe@company.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Secondary Contact Phone</label>
                    <input
                      name="secondaryContactPhone"
                      type="tel"
                      value={formData.secondaryContactPhone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className="form-group">
                    <label>Domain Expertise</label>
                    <input
                      name="domainExpertise"
                      value={formData.domainExpertise}
                      onChange={handleChange}
                      placeholder="e.g. Cloud, AI, FinTech, Healthcare"
                    />
                  </div>

                  <div className="form-group">
                    <label>Total Projects Executed</label>
                    <input
                      name="totalProjectsExecuted"
                      type="number"
                      min="0"
                      value={formData.totalProjectsExecuted}
                      onChange={handleChange}
                      placeholder="e.g. 25"
                    />
                  </div>
                </div>




                <h4 className="form-section-title">🧾 Additional Information</h4>

                <div className="form-grid">
                  <div className="form-group full">
                    <label>Company Overview <span className="required-asterisk">*</span></label>
                    <textarea
                      name="companyOverview"
                      value={formData.companyOverview}
                      onChange={handleChange}
                      className={`textarea ${errors.companyOverview ? "error" : ""}`}
                      placeholder="Describe the company's services, areas of expertise, and what makes you a valuable supplier partner..."
                      rows="5"
                    />
                    {errors.companyOverview && (
                      <span className="error-message">{errors.companyOverview}</span>
                    )}
                    {formData.companyOverview && (
                      <small className="char-count">
                        {formData.companyOverview.length} characters
                        {formData.companyOverview.length < 50 && ` (minimum 50 required)`}
                      </small>
                    )}
                  </div>

                  <div className="form-group full">
                    <label>Certifications</label>

                    {certifications.map((cert, index) => (
                      <div className="certification-row" key={index}>
                        <input
                          type="text"
                          value={cert}
                          placeholder="e.g., ISO 9001:2015"
                          onChange={(e) =>
                            updateCertification(index, e.target.value)
                          }
                        />
                        {index === certifications.length - 1 && (
                          <button
                            type="button"
                            className="cert-add-btn"
                            onClick={addCertification}
                          >
                            Add
                          </button>
                        )}
                        {certifications.length > 1 && (
                          <button
                            type="button"
                            className="cert-remove-btn"
                            onClick={() => removeCertification(index)}
                            title="Remove certification"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => navigate("/landingPage")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!isFormValid() || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
      <LandingFooter />

    </>
  );
}
