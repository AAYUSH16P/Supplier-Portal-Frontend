import { useState, useMemo, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import { getAvailableSlotsForDate, scheduleMeeting } from "../../services/calendar";
import "../../style/RegisteredUser/BookMeeting.css";
import AppFooter from "../../Components/common/AppFooter";


const isWeekend = (date) => {
  if (!date) return false;
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  return day === 0 || day === 6;
};



export default function BookMeeting() {
  const [confirmedDate, setConfirmedDate] = useState("");
  const [confirmedTime, setConfirmedTime] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const getCompanyIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const parts = token.split(".");
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      return payload.companyId || null;
    } catch (error) {
      console.error("Error decoding companyId from token:", error);
      return null;
    }
  };


  const adminEmail = "ayush@westgateithub.com";

  // Get today's date (reset time to start of day for comparison)
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);


  const parseUtcDate = (dateStr) => {
    // Format: MM/DD/YYYY HH:mm:ss  (as per your token meaning)
    const [datePart, timePart] = dateStr.split(" ");

    const [month, day, year] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);

    // Explicit UTC construction
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  };


  const getActiveMeeting = useCallback(() => {
    try {
      // 1️⃣ Check localStorage first
      const local = localStorage.getItem("activeMeeting");
      if (local) {
        const { startUtc, endUtc } = JSON.parse(local);
        if (new Date() < new Date(endUtc)) {
          return {
            startUtc: new Date(startUtc),
            endUtc: new Date(endUtc),
          };
        } else {
          localStorage.removeItem("activeMeeting");
        }
      }
  
      // 2️⃣ Fallback to token
      const token = localStorage.getItem("token");
      if (!token) return null;
  
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!payload.NextMeetingAt) return null;
  
      const startUtc = parseUtcDate(payload.NextMeetingAt);
      const endUtc = new Date(startUtc.getTime() + 30 * 60 * 1000);
  
      return new Date() < endUtc ? { startUtc, endUtc } : null;
    } catch {
      return null;
    }
  }, []);
  




  const getUtcRangeForDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const startUtc = new Date(Date.UTC(year, month, day, 0, 0, 0)).toISOString();
    const endUtc = new Date(Date.UTC(year, month, day, 23, 59, 59)).toISOString();

    return { startUtc, endUtc };
  };



  // Get the last available date (30 days from today)
  const lastAvailableDate = useMemo(() => {
    const date = new Date(today);
    date.setDate(today.getDate() + 29); // 30 days total (including today)
    return date;
  }, [today]);

  // Generate next 30 days from today


  // Check if a date is within the 30-day window
  const isDateAvailable = (date) => {
    if (!date) return false;
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck >= today && dateToCheck <= lastAvailableDate;
  };

  // Check if a date is in the past
  const isPastDate = (date) => {
    if (!date) return false;
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  // Format date to YYYY-MM-DD for API
  // const formatDateForAPI = (date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  // Format date for display
  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };


  // Convert time to IST format for display
  const formatTimeInIST = (date) => {
    if (!date) return "";

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };


  // Extract time from slot object
  const getTimeFromSlot = (slot) => {
    if (typeof slot === "string") {
      return slot;
    }
    if (slot && slot.startIst) {
      return slot.startIst;
    }
    if (slot && slot.startTime) {
      return slot.startTime;
    }
    if (slot && slot.time) {
      return slot.time;
    }
    return null;
  };

  // Handle date click
  const handleDateClick = async (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setLoading(true);
    setAvailableSlots([]);

    try {
      const { startUtc, endUtc } = getUtcRangeForDate(date);

      const response = await getAvailableSlotsForDate(
        adminEmail,
        startUtc,
        endUtc
      );

      const busyEvents = Array.isArray(response.data) ? response.data : [];

      const available = generateAvailableSlotsFromEvents(date, busyEvents);

      setAvailableSlots(available);
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const generateAvailableSlotsFromEvents = (date, busyEvents) => {
    const slots = [];
    busyEvents.forEach((event, i) => {

    });
    console.groupEnd();

    const startIstHour = 10;
    const endIstHour = 17; // 3 PM

    console.group("🧮 Slot evaluation (30-min IST)");

    for (let hour = startIstHour; hour < endIstHour; hour++) {
      for (let minute of [0, 30]) {
        const istDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hour,
          minute,
          0
        );

        const utcDate = new Date(istDate.getTime() - 5.5 * 60 * 60 * 1000);

        const slotStart = utcDate.toISOString();
        const slotEnd = new Date(utcDate.getTime() + 30 * 60000).toISOString();

        const slotLabel = `${istDate.toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })} - ${new Date(
          istDate.getTime() + 30 * 60000
        ).toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}`;

        let blockedBy = null;

        const isBusy = busyEvents.some(event => {
          const busyStart = new Date(event.startUtc);
          const busyEnd = new Date(event.endUtc);


          const overlap =
            new Date(slotStart) < busyEnd &&
            new Date(slotEnd) > busyStart;

          if (overlap) {
            blockedBy = event.subject;
          }

          return overlap;
        });

        if (isBusy) {
          console.warn("❌ BLOCKED:", slotLabel, "| Reason:", blockedBy);
        } else {
          slots.push({
            startIst: istDate,
          });
        }
      }
    }

    console.groupEnd();
    console.groupEnd();

    return slots;
  };





  // Handle time slot click
  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  // Decode JWT token to extract email
  const getEmailFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      // JWT tokens have 3 parts separated by dots: header.payload.signature
      const parts = token.split(".");
      if (parts.length !== 3) return null;

      // Decode the payload (second part)
      const payload = JSON.parse(atob(parts[1]));
      return payload.email || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Convert IST datetime to UTC
  // const convertIstToUtc = (istDateTimeString) => {
  //   // Parse the IST datetime string (format: "2025-12-29T10:00:00")
  //   // IST is UTC+5:30, so we need to subtract 5 hours and 30 minutes to get UTC
  //   const [datePart, timePart] = istDateTimeString.split("T");
  //   const [year, month, day] = datePart.split("-").map(Number);
  //   const [hours, minutes, seconds = 0] = timePart.split(":").map(Number);

  //   // Create a date object treating the input as IST
  //   // We'll manually calculate UTC by subtracting 5:30
  //   const istDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));

  //   // Subtract IST offset (5 hours 30 minutes = 5.5 hours = 19800000 milliseconds)
  //   const utcDate = new Date(istDate.getTime() - (5.5 * 60 * 60 * 1000));

  //   return utcDate.toISOString();
  // };

  // Handle booking confirmation

  useEffect(() => {
    const meeting = getActiveMeeting();
  
    if (meeting) {
      setConfirmedDate(formatDateForDisplay(meeting.startUtc));
      setConfirmedTime(formatTimeInIST(meeting.startUtc));
      setBookingConfirmed(true);
    }
  }, [getActiveMeeting]);
  




  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time slot");
      return;
    }

    const attendeeEmail = getEmailFromToken();
    if (!attendeeEmail) {
      toast.error("Unable to get your email. Please login again.");
      return;
    }

    setBookingLoading(true);

    try {
      console.group("📅 BOOK MEETING DEBUG");


      // ✅ Same Date object used during slot generation
      const istDate =
        typeof selectedTime === "object"
          ? selectedTime.startIst
          : selectedTime;

      if (!(istDate instanceof Date)) {
        throw new Error("Invalid time slot");
      }



      // 🔁 IST → UTC (RULE APPLIED HERE)
      const startUtc = istDate.toISOString();



      // ⏱ 30-minute meeting
      const endUtc = new Date(
        istDate.getTime() + 30 * 60 * 1000
      ).toISOString();



      const companyId = getCompanyIdFromToken();

      const payload = {
        companyId: companyId,
        subject: "onboarding call",
        startUtc,
        endUtc,
        attendeeEmails: [attendeeEmail],
      };

      console.groupEnd();

      const response = await scheduleMeeting(adminEmail, payload);





      if (response.status === 200 || response.status === 201) {
        const istStart =
          typeof selectedTime === "object"
            ? selectedTime.startIst
            : selectedTime;

        setConfirmedDate(formatDateForDisplay(istStart));
        setConfirmedTime(formatTimeInIST(istStart));
        localStorage.setItem(
          "activeMeeting",
          JSON.stringify({
            startUtc,
            endUtc,
          })
        );


        setBookingConfirmed(true); // 🔥 THIS WAS MISSING

        toast.success("Meeting booked successfully!", { autoClose: 5000 });

        setSelectedDate(null);
        setSelectedTime(null);
        setAvailableSlots([]);
      }

    } catch (error) {
      console.groupEnd();
      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to book meeting"
      );
    } finally {
      setBookingLoading(false);
    }
  };





  // Get month and year for display
  const getMonthYear = () => {
    return currentMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  // Navigate to next month
  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    // Only allow navigation if the previous month is not before today's month
    const todayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const prevMonthStart = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1);
    if (prevMonthStart >= todayMonth) {
      setCurrentMonth(prevMonth);
    }
  };

  // Check if next month button should be enabled
  const canGoNext = () => {
    // Check if the first day of the next month is within the 30-day window
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    const nextMonthStart = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);

    // Reset time to start of day for accurate comparison
    nextMonthStart.setHours(0, 0, 0, 0);
    const lastAvailable = new Date(lastAvailableDate);
    lastAvailable.setHours(0, 0, 0, 0);

    // Enable if the first day of next month is within the 30-day window
    return nextMonthStart <= lastAvailable;
  };

  // Check if previous month button should be enabled
  const canGoPrev = () => {
    const todayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const currentMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    return currentMonthStart > todayMonth;
  };

  // Generate calendar grid for current month
  const getCalendarWeeks = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const weeks = [];
    let currentWeek = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      currentWeek.push(date);

      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    // Add remaining empty cells to complete the last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const calendarWeeks = getCalendarWeeks();

  return (
    <>
      <AppHeader />
      <ToastContainer />

      <div className="meeting-layout">
        <AppSidebar unlocked active="Book a Meeting" />

        <main className="meeting-page">
          {bookingConfirmed ? (
            <BookingConfirmedUI
              dateText={confirmedDate}
              timeText={confirmedTime}
            />
          ) : (

            <>
              {/* TOP STRIP */}
              <section className="meeting-strip">
                📅 Schedule Your Consultation with Our Team
              </section>

              {/* MAIN CARD */}
              <section className="meeting-card">
                <div className="meeting-title">
                  <div className="meeting-icon">📅</div>
                  <div>
                    <h2>Book a Meeting</h2>
                    <p>
                      Schedule a 30-minute onboarding call with our team. We are
                      available Monday–Friday, 10:00 AM to 5:00 PM (IST).
                    </p>
                  </div>
                </div>
              </section>

              {/* CONTENT GRID */}
              <section className="meeting-grid">
                {/* LEFT */}




                <div className="calendar-box">
                  <div className="calendar-header">
                    <div>
                      <h4>Select Date & Time</h4>
                      <span>Select a date and time below:</span>
                    </div>
                    <span className="timezone">⏱ Indian Standard Time (IST)</span>
                  </div>

                  {/* CALENDAR */}
                  <div className="calendar">
                    <div className="calendar-month">
                      <button
                        className="month-nav-btn"
                        onClick={handlePrevMonth}
                        disabled={!canGoPrev()}
                        aria-label="Previous month"
                      >
                        ←
                      </button>
                      <strong>{getMonthYear()}</strong>
                      <button
                        className="month-nav-btn"
                        onClick={handleNextMonth}
                        disabled={!canGoNext()}
                        aria-label="Next month"
                      >
                        →
                      </button>
                    </div>

                    <div className="calendar-grid">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                        <div key={d} className="day-label">{d}</div>
                      ))}

                      {calendarWeeks.map((week, weekIndex) =>
                        week.map((date, dayIndex) => {
                          const isAvailable = isDateAvailable(date);
                          const isPast = isPastDate(date);
                          const isSelected = date && selectedDate &&
                            date.toDateString() === selectedDate.toDateString();

                          return (
                            <button
                              key={`${weekIndex}-${dayIndex}`}
                              className={`date ${!date ? "empty" : ""
                                } ${isPast ? "disabled" : ""
                                } ${(!isAvailable || isWeekend(date)) && !isPast ? "disabled" : ""
                                } ${isSelected ? "active" : ""
                                }`}
                              onClick={() =>
                                date && isAvailable && !isWeekend(date) && handleDateClick(date)
                              }
                              disabled={!date || !isAvailable || isWeekend(date)}

                              title={
                                isPast
                                  ? "Past dates are not available"
                                  : !isAvailable
                                    ? "Date is beyond 30 days window"
                                    : ""
                              }
                            >
                              {date ? date.getDate() : ""}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* TIME SLOTS */}
                  <div className="slots">
                    <h5>Available time slots:</h5>
                    {loading ? (
                      <div style={{ padding: "20px", textAlign: "center" }}>
                        Loading available slots...
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="slot-grid">
                        {availableSlots.map((slot, index) => {
                          const timeStr = getTimeFromSlot(slot);
                          if (!timeStr) return null;

                          const formattedTime = formatTimeInIST(timeStr);
                          // Compare using the slot object or startIst value
                          const isSelected = selectedTime && (
                            (typeof selectedTime === "object" && selectedTime.startIst === slot.startIst) ||
                            (typeof selectedTime === "string" && selectedTime === timeStr)
                          );

                          return (
                            <button
                              key={index}
                              className={`slot ${isSelected ? "selected" : ""}`}
                              onClick={() => handleTimeClick(slot)}
                            >
                              {formattedTime}
                            </button>
                          );
                        })}
                      </div>
                    ) : selectedDate ? (
                      <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
                        No available slots for this date
                      </div>
                    ) : (
                      <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
                        Please select a date to view available time slots
                      </div>
                    )}
                  </div>

                </div>



                {/* RIGHT */}
                <div className="info-box refined">
                  <h4>Before You Book</h4>

                  <div className="info-row">
                    <span className="info-icon success">✔</span>
                    <div>
                      <strong>Pre-filled details:</strong>
                      <p>Your name, email and company will be auto-filled if you are logged in.</p>
                    </div>
                  </div>

                  <div className="info-divider" />

                  <div className="info-row">
                    <span className="info-icon clock">⏱</span>
                    <div>
                      <strong>Meeting Overview:</strong>
                      <p>This is a 30-minute onboarding introduction call.</p>
                    </div>
                  </div>

                  <div className="info-divider" />

                  <h5>What We Will Cover:</h5>

                  <ul className="dot-list">
                    <li>Supplier onboarding steps</li>
                    <li>How opportunities are shared</li>
                    <li>Candidate submission expectations</li>
                    <li>Any questions you may have</li>
                  </ul>
                </div>

              </section>

              {/* FOOTER ACTION */}
              <section className="confirm-box">
                <button
                  className="confirm-btn"
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime || bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>
                {selectedDate && selectedTime && (
                  <p>
                    Selected: {formatDateForDisplay(selectedDate)} at{" "}
                    {formatTimeInIST(
                      typeof selectedTime === "object"
                        ? selectedTime.startIst
                        : selectedTime
                    )}
                  </p>
                )}
                {selectedDate && !selectedTime && (
                  <p style={{ color: "#6b7280" }}>
                    Please select a time slot
                  </p>
                )}
                {!selectedDate && (
                  <p style={{ color: "#6b7280" }}>
                    Please select a date and time
                  </p>
                )}
              </section>
            </>
          )}
        </main>


      </div>
      <AppFooter />
    </>
  );
}



function BookingConfirmedUI({ dateText, timeText }) {
  return (
    <div className="booking-page">
      {/* TOP STRIP */}
      <div className="booking-header">
        <span className="calendar-icon">📅</span>
        <span>Schedule Your Consultation with Our Team</span>
      </div>

      {/* CONFIRM CARD */}
      <div className="booking-card">
        <div className="success-icon">✓</div>

        <h2 className="booking-title">Booking Confirmed!</h2>

        {/* ✅ DATE & TIME LINE */}
        <p className="booking-datetime">
          Your meeting is scheduled for{" "}
          <strong>{dateText}</strong> at <strong>{timeText}</strong>.
        </p>

        <p className="booking-subtext">
          We look forward to seeing you!
        </p>
      </div>
    </div>
  );
}

