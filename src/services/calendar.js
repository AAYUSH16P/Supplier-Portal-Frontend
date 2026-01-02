import apiClient from "./apiClient";

export const getAvailableSlots = (adminEmail, date) =>
  apiClient.get("/calendar/availability", {
    params: { adminEmail, dateIst: date },
  });

  export const getAvailableSlotsForDate = (hostEmail, startUtc, endUtc) =>
    apiClient.get("/calendar/events", {
      params: {
        hostEmail,
        startUtc,
        endUtc,
      },
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

