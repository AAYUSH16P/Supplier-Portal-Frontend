/**
 * Maps nested frontend company registration form data to flat backend DTO format
 * 
 * @param {Object} nestedData - Nested form data structure
 * @param {string} nestedData.companyName
 * @param {string} nestedData.companyWebsite
 * @param {string} nestedData.businessType
 * @param {string} nestedData.companySize
 * @param {number|string} nestedData.yearEstablished
 * @param {string} nestedData.companyOverview
 * @param {Object} nestedData.address - Address object
 * @param {string} nestedData.address.addressLine1
 * @param {string} [nestedData.address.addressLine2]
 * @param {string} nestedData.address.city
 * @param {string} nestedData.address.state
 * @param {string} nestedData.address.postalCode
 * @param {string} nestedData.address.country
 * @param {Object} nestedData.primaryContact - Primary contact object
 * @param {string} nestedData.primaryContact.name
 * @param {string} nestedData.primaryContact.role
 * @param {string} nestedData.primaryContact.email
 * @param {string} nestedData.primaryContact.phone
 * @param {Object} [nestedData.secondaryContact] - Optional secondary contact object
 * @param {string} [nestedData.secondaryContact.name]
 * @param {string} [nestedData.secondaryContact.role]
 * @param {string} [nestedData.secondaryContact.email]
 * @param {string} [nestedData.secondaryContact.phone]
 * @param {string[]} [nestedData.certifications] - Array of certification strings
 * 
 * @returns {Object} Flat backend DTO payload
 */
export const mapCompanyPayload = (nestedData) => {
  // Defensive null/undefined checks with safe defaults
  const address = nestedData?.address || {};
  const primaryContact = nestedData?.primaryContact || {};
  const secondaryContact = nestedData?.secondaryContact || {};
  const certifications = nestedData?.certifications || [];

  // Build flat payload with all required fields
  const flatPayload = {
    // Company Information
    companyName: nestedData?.companyName || "",
    companyWebsite: nestedData?.companyWebsite || "",
    businessType: nestedData?.businessType || "",
    companySize: nestedData?.companySize || "",
    yearEstablished: nestedData?.yearEstablished 
      ? (typeof nestedData.yearEstablished === 'string' 
          ? parseInt(nestedData.yearEstablished, 10) 
          : nestedData.yearEstablished)
      : null,
    companyOverview: nestedData?.companyOverview || "",

    // Address Fields (flattened)
    addressLine1: address?.addressLine1 || "",
    addressLine2: address?.addressLine2 || "", // Always included, even if empty
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    country: address?.country || "",

    // Primary Contact Fields (flattened)
    primaryContactName: primaryContact?.name || "",
    primaryContactRole: primaryContact?.role || "",
    primaryContactEmail: primaryContact?.email || "",
    primaryContactPhone: primaryContact?.phone || "",

    // Secondary Contact Fields (flattened, always included)
    secondaryContactName: secondaryContact?.name || "",
    secondaryContactRole: secondaryContact?.role || "",
    secondaryContactEmail: secondaryContact?.email || "",
    secondaryContactPhone: secondaryContact?.phone || "",
    domainExpertise: nestedData.domainExpertise,
    projectExecuted: nestedData.projectExecuted,
    // Certifications (always included as array, even if empty)
    certifications: Array.isArray(certifications) 
      ? certifications.filter(cert => cert && cert.trim() !== "")
      : [],
  };

  return flatPayload;
};

/**
 * Example usage and expected output structure
 * 
 * Input (nested):
 * {
 *   companyName: "TechCorp Solutions",
 *   companyWebsite: "https://techcorp.com",
 *   businessType: "Private Limited",
 *   companySize: "51-200",
 *   yearEstablished: 2010,
 *   companyOverview: "Leading IT solutions provider...",
 *   address: {
 *     addressLine1: "123 Tech Street",
 *     addressLine2: "Suite 100",
 *     city: "Bangalore",
 *     state: "Karnataka",
 *     postalCode: "560001",
 *     country: "India"
 *   },
 *   primaryContact: {
 *     name: "Jane Smith",
 *     role: "Operations Manager",
 *     email: "jane@techcorp.com",
 *     phone: "+91 98765 43210"
 *   },
 *   secondaryContact: {
 *     name: "John Doe",
 *     role: "Business Development",
 *     email: "john@techcorp.com",
 *     phone: "+91 98765 43211"
 *   },
 *   certifications: ["ISO 9001:2015", "ISO 27001"]
 * }
 * 
 * Output (flat):
 * {
 *   companyName: "TechCorp Solutions",
 *   companyWebsite: "https://techcorp.com",
 *   businessType: "Private Limited",
 *   companySize: "51-200",
 *   yearEstablished: 2010,
 *   companyOverview: "Leading IT solutions provider...",
 *   addressLine1: "123 Tech Street",
 *   addressLine2: "Suite 100",
 *   city: "Bangalore",
 *   state: "Karnataka",
 *   postalCode: "560001",
 *   country: "India",
 *   primaryContactName: "Jane Smith",
 *   primaryContactRole: "Operations Manager",
 *   primaryContactEmail: "jane@techcorp.com",
 *   primaryContactPhone: "+91 98765 43210",
 *   secondaryContactName: "John Doe",
 *   secondaryContactRole: "Business Development",
 *   secondaryContactEmail: "john@techcorp.com",
 *   secondaryContactPhone: "+91 98765 43211",
 *   certifications: ["ISO 9001:2015", "ISO 27001"]
 * }
 */



