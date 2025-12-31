import apiClient from "./apiClient";

export const registerCompany = (payload) =>
  apiClient.post("Supplier/new-supplier-registered", payload);

export const approveCompany = (companyId) =>
  apiClient.post("/company/approve", { companyId });

export const rejectCompany = (companyId, remark) =>
  apiClient.post("/company/reject", { companyId, remark });

export const signSla = (companyId) =>
  apiClient.post("/company/sign-sla", { companyId });
