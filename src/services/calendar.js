import apiClient from "./apiClient";

export const getAvailableSlots = (adminEmail, date) =>
  apiClient.get("/calendar/availability", {
    params: { adminEmail, dateIst: date },
  });

export const getAvailableSlotsForDate = (adminEmail, dateIst) =>
  apiClient.get("/calendar/available-slots", {
    params: { adminEmail, dateIst },
  });

export const scheduleMeeting = (hostEmail, payload) =>
  apiClient.post("/calendar/schedule", payload, {
    params: { hostEmail },
  });

export const getAdminAvailability = (adminEmail) =>
  apiClient.post(
    "/calendar/admin/availability",
    null,
    {
      params: { adminEmail }
    }
  );

