import HomePage from "./pages/LandingPage/HomePage";
import { Routes, Route } from "react-router-dom";
import OnboardingLanding from "./pages/LandingPage/OnboardingLanding";
import LandingPage from "./pages/LandingPage/LandingPage";
import AboutTalentedStaff from "./pages/LandingPage/AboutTalentedStaff";
import OperatingModel from "./pages/LandingPage/OperatingModel";
import HowItWorks from "./pages/LandingPage/HowItWorks";
import FAQ from "./pages/LandingPage/Faq";
import Registration from "./pages/LandingPage/Resgistration";
import SupplierRegistration from "./pages/LandingPage/SupplierRegistration";
import Contact from "./pages/LandingPage/Contact";
import SupplierLogin from "./pages/RegisteredUser/SupplierLogin";
import SupplierAcknowledgement from "./pages/RegisteredUser/SupplierAcknowledgement";
import SupplierHome from "./pages/RegisteredUser/SupplierHome";
import About from "./pages/RegisteredUser/About";
import SupplierOperatingModel from "./pages/RegisteredUser/SupplierOperatingModel";
import SupplierHowItWorks from "./pages/RegisteredUser/SupplierHowItWorks";
import MyCompanyDetails from "./pages/RegisteredUser/MyCompanyDetails";
import BookMeeting from "./pages/RegisteredUser/BookMeeting";
import ReviewCandidates from "./pages/RegisteredUser/ReviewCandidates";
import Candidates from "./pages/RegisteredUser/Candidates";
import CapacityRegistration from "./pages/RegisteredUser/CapacityRegistration";
import AddCapacityManually from "./pages/RegisteredUser/AddCapacityManually";
import BulkCapacityUpload from "./pages/RegisteredUser/BulkCapacityUpload";
import EmployerInitiatedInvite from "./pages/RegisteredUser/EmployerInitiatedInvite"
import { ToastContainer } from "react-toastify";
import Notifications from "./pages/RegisteredUser/Notifications";
import SupplierApprovals from "./pages/Admin/SupplierApprovals";
import CandidateValidation from "./pages/RegisteredUser/CandidateValidation"
import CompanyChangeRequests from "./pages/Admin/CompanyChangeRequests";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import EmployeeInviteInfo from "./pages/RegisteredUser/EmployeeInviteInfo";
import ResetPassword from "./style/RegisteredUser/ResetPassword";
import ForgotPassword from "./pages/RegisteredUser/ForgotPassword"
import RegistrationSuccess from "./pages/LandingPage/RegistrationSuccess";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/onboardingLanding" element={<OnboardingLanding />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/about" element={<AboutTalentedStaff />} />
        <Route path="/operating" element={<OperatingModel />} />
        <Route path="/how-it-work" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/supplier-registration" element={<SupplierRegistration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<SupplierLogin />} />
        <Route path="/acknowledge" element={<SupplierAcknowledgement />} />
        <Route path="/home" element={<SupplierHome />} />
        <Route path="/about-ts" element={<About />} />
        <Route path="/operatingModel" element={<SupplierOperatingModel />} />
        <Route path="/howItWork" element={<SupplierHowItWorks />} />
        <Route path="/detail" element={<MyCompanyDetails />} />
        <Route path="/meeting" element={<BookMeeting />} />
        <Route path="/reviewCandidate" element={<ReviewCandidates />} />
        <Route path="/candidate" element={<Candidates />} />
        <Route path="/capacityRegistration" element={<CapacityRegistration />} />
        <Route path="/addCapacityManually" element={<AddCapacityManually />} />
        <Route path="/bulkCapacityUpload" element={<BulkCapacityUpload />} />
        <Route path="/employerInitiatedInvite" element={<EmployerInitiatedInvite />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/employeeInviteInfo" element={<EmployeeInviteInfo />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />

        

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN ROUTES (PROTECTED) */}
        <Route
          path="/supplierApprovals"
          element={
            <AdminProtectedRoute>
              <SupplierApprovals />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/candidate-validation"
          element={
            <AdminProtectedRoute>
              <CandidateValidation />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/request-for-change"
          element={
            <AdminProtectedRoute>
              <CompanyChangeRequests />
            </AdminProtectedRoute>
          }
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}


export default App;