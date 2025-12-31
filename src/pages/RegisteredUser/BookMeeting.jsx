import { useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppHeader from "../../Components/RegisteredUser/AppHeader";
import AppSidebar from "../../Components/RegisteredUser/AppSidebar";
import { getAvailableSlotsForDate, scheduleMeeting } from "../../services/calendar";
import "../../style/RegisteredUser/BookMeeting.css";

export default function BookMeeting() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const adminEmail = "ayush@westgateithub.com";

  // Get today's date (reset time to start of day for comparison)
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

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
  const formatDateForAPI = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Convert time to IST format for display
  const formatTimeInIST = (timeString) => {
    if (!timeString) return "";
    
    // Handle ISO datetime format like "2025-12-29T10:00:00"
    if (typeof timeString === "string" && timeString.includes("T")) {
      const date = new Date(timeString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      }
    }
    
    // Handle formats like "09:00:00" or "9:00 AM"
    if (typeof timeString === "string") {
      const timeMatch = timeString.match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        let hours = parseInt(timeMatch[1]);
        const minutes = timeMatch[2];
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
      }
    }
    return timeString;
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
      const dateStr = formatDateForAPI(date);
      const response = await getAvailableSlotsForDate(adminEmail, dateStr);
      
      // Handle response - assuming the API returns an array of time slots
      if (response.data) {
        // If response.data is an array, use it directly
        // If it's an object with a slots property, use that
        const slots = Array.isArray(response.data) 
          ? response.data 
          : response.data.slots || response.data.availableSlots || [];
        
        setAvailableSlots(slots);
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
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
  const convertIstToUtc = (istDateTimeString) => {
    // Parse the IST datetime string (format: "2025-12-29T10:00:00")
    // IST is UTC+5:30, so we need to subtract 5 hours and 30 minutes to get UTC
    const [datePart, timePart] = istDateTimeString.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hours, minutes, seconds = 0] = timePart.split(":").map(Number);
    
    // Create a date object treating the input as IST
    // We'll manually calculate UTC by subtracting 5:30
    const istDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    
    // Subtract IST offset (5 hours 30 minutes = 5.5 hours = 19800000 milliseconds)
    const utcDate = new Date(istDate.getTime() - (5.5 * 60 * 60 * 1000));
    
    return utcDate.toISOString();
  };

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time slot", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const attendeeEmail = getEmailFromToken();
    if (!attendeeEmail) {
      toast.error("Unable to get your email. Please login again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setBookingLoading(true);

    try {
      // Get startIst from selectedTime
      const startIst = typeof selectedTime === "object" 
        ? selectedTime.startIst 
        : selectedTime;
      
      if (!startIst) {
        throw new Error("Invalid time slot selected");
      }

      // Convert startIst to UTC
      const startUtc = convertIstToUtc(startIst);
      
      // Calculate endUtc (1 hour after startUtc)
      const startDate = new Date(startUtc);
      const endDate = new Date(startDate.getTime() + (60 * 60 * 1000)); // Add 1 hour
      const endUtc = endDate.toISOString();

      // Prepare payload
      const payload = {
        subject: "onboarding call",
        startUtc: startUtc,
        endUtc: endUtc,
        attendeeEmails: [attendeeEmail],
      };

      // Call the API
      const response = await scheduleMeeting(adminEmail, payload);

      if (response.status === 200 || response.status === 201) {
        toast.success("Meeting booked successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        
        // Reset selections after successful booking
        setSelectedDate(null);
        setSelectedTime(null);
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error("Booking error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to book meeting. Please try again.";
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
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
                  available Monday–Friday, 9:00 AM to 3:00 PM (IST).
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
                  {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
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
                          className={`date ${
                            !date ? "empty" : ""
                          } ${
                            isPast ? "disabled" : ""
                          } ${
                            !isAvailable && !isPast ? "disabled" : ""
                          } ${
                            isSelected ? "active" : ""
                          }`}
                          onClick={() => date && isAvailable && handleDateClick(date)}
                          disabled={!date || !isAvailable}
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
            <div className="info-box">
              <h4>Before You Book</h4>

              <ul>
                <li>
                  ✅ <strong>Pre-filled details:</strong> Your name, email and
                  company will be auto-filled if logged in.
                </li>
                <li>
                  ⏱ <strong>Meeting Overview:</strong> This is a 30-minute
                  onboarding introduction call.
                </li>
              </ul>

              <div className="divider" />

              <h5>What We Will Cover:</h5>
              <ul className="bullet-list">
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
        </main>
      </div>
    </>
  );
}
