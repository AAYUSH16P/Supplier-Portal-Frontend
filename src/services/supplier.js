import apiClient from "./apiClient";

export const submitManualCapacity = (payload) =>
  apiClient.post("/Supplier/manual-upload", payload);


export const getSupplierCapacities = (companyId) =>
  apiClient.get(`/supplier/capacities`, {
    params: {
      companyId,
      filter: "all",
    },
  });

  