export const COMPANY_FIELDS = {
    // ===== Company Information =====
    companyName: {
      label: "Company Name",
      type: "text",
    },
    companyWebsite: {
      label: "Company Website",
      type: "url",
    },
    businessType: {
      label: "Business Type",
      type: "select",
      options: [
        "Private Limited",
        "Public Limited",
        "Partnership",
        "LLP",
        "Sole Proprietorship",
        "Other",
      ],
    },
    companySize: {
      label: "Company Size",
      type: "select",
      options: [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+",
      ],
    },
    yearEstablished: {
      label: "Year Established",
      type: "number",
    },
    companyOverview: {
      label: "Company Overview",
      type: "textarea",
    },
    domainExpertise: {
      label: "Domain Expertise",
      type: "text",
    },
    totalProjectsExecuted: {
      label: "Total Projects Executed",
      type: "number",
    },
  
    // ===== Address =====
    addressLine1: { label: "Address Line 1", type: "text" },
    addressLine2: { label: "Address Line 2", type: "text" },
    city: { label: "City", type: "text" },
    state: { label: "State", type: "text" },
    postalCode: { label: "Postal Code", type: "text" },
    country: { label: "Country", type: "select" },
  
    // ===== Primary Contact =====
    primaryContactName: { label: "Primary Contact Name", type: "text" },
    primaryContactRole: { label: "Primary Contact Role", type: "text" },
    primaryContactEmail: { label: "Primary Contact Email", type: "email" },
    primaryContactPhone: { label: "Primary Contact Phone", type: "tel" },
  
    // ===== Secondary Contact =====
    secondaryContactName: { label: "Secondary Contact Name", type: "text" },
    secondaryContactRole: { label: "Secondary Contact Role", type: "text" },
    secondaryContactEmail: { label: "Secondary Contact Email", type: "email" },
    secondaryContactPhone: { label: "Secondary Contact Phone", type: "tel" },
  
    // ===== Certifications =====
    certifications: {
      label: "Certifications",
      type: "textarea",
    },
  };
  