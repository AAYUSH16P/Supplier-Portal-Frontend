import HomePage from "./pages/LandingPage/HomePage";
import { Routes, Route } from "react-router-dom";
import OnboardingLanding from "./pages/LandingPage/OnboardingLanding";
import LandingPage from "./pages/LandingPage/LandingPage";
import AboutTalentedStaff from "./pages/LandingPage/AboutTalentedStaff";
import OperatingModel from "./pages/LandingPage/OperatingModel";
import HowItWorks from "./pages/LandingPage/HowItWorks";
import Registration from "./pages/LandingPage/Resgistration";
import SupplierRegistration from "./pages/LandingPage/SupplierRegistration";
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
import PublicFAQ from "./pages/LandingPage/PublicFAQ";
import PublicContact from "./pages/LandingPage/PublicContact";
import PrivateContact from "./pages/LandingPage/PrivateContact";
import PrivateFAQ from "./pages/LandingPage/PrivateFAQ";
import AddEmployee from "./pages/Admin/AddEmployee";
import AddSupplier from "./pages/Admin/AddSupplier";
import SupplierProtectedRoute from "./routes/SupplierProtectedRoute";


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
        <Route path="/registration" element={<Registration />} />
        <Route path="/supplier-registration" element={<SupplierRegistration />} />
        <Route path="/login" element={<SupplierLogin />} />

        <Route path="/acknowledge" element={
          <SupplierProtectedRoute>
            <SupplierAcknowledgement/>
          </SupplierProtectedRoute>
        } />
        <Route path="/home" element={ 
          <SupplierProtectedRoute> 
            <SupplierHome /> 
          </SupplierProtectedRoute>
        } />
        <Route path="/about-ts" element={<SupplierProtectedRoute> <About /> </SupplierProtectedRoute>} />
        <Route path="/operatingModel" element={<SupplierProtectedRoute> <SupplierOperatingModel /> </SupplierProtectedRoute>} />
        <Route path="/howItWork" element={<SupplierProtectedRoute> <SupplierHowItWorks /> </SupplierProtectedRoute>} />
        <Route path="/detail" element={<SupplierProtectedRoute> <MyCompanyDetails /> </SupplierProtectedRoute>} />
        <Route path="/meeting" element={<SupplierProtectedRoute> <BookMeeting /> </SupplierProtectedRoute>} />
        <Route path="/reviewCandidate" element={<SupplierProtectedRoute> <ReviewCandidates /> </SupplierProtectedRoute>} />
        <Route path="/candidate" element={<SupplierProtectedRoute> <Candidates /> </SupplierProtectedRoute>} />
        <Route path="/capacityRegistration" element={<SupplierProtectedRoute> <CapacityRegistration /> </SupplierProtectedRoute>} />
        <Route path="/addCapacityManually" element={<SupplierProtectedRoute> <AddCapacityManually /> </SupplierProtectedRoute>} />
        <Route path="/bulkCapacityUpload" element={<SupplierProtectedRoute> <BulkCapacityUpload /> </SupplierProtectedRoute>} />
        <Route path="/employerInitiatedInvite" element={<SupplierProtectedRoute> <EmployerInitiatedInvite /> </SupplierProtectedRoute>} />
        <Route path="/notification" element={<SupplierProtectedRoute> <Notifications /> </SupplierProtectedRoute>} />
        <Route path="/registration-success" element={<SupplierProtectedRoute> <RegistrationSuccess /> </SupplierProtectedRoute>} />
        <Route path="/employeeInviteInfo" element={<SupplierProtectedRoute> <EmployeeInviteInfo /> </SupplierProtectedRoute>} />
        <Route path="/forgot-password" element={<SupplierProtectedRoute> <ForgotPassword /> </SupplierProtectedRoute>} />
        <Route path="/reset-password" element={<SupplierProtectedRoute> <ResetPassword /> </SupplierProtectedRoute>} />
        <Route path="/public-faq" element={<SupplierProtectedRoute> <PublicFAQ /> </SupplierProtectedRoute>} />
        <Route path="/private-faq" element={<SupplierProtectedRoute> <PrivateFAQ /> </SupplierProtectedRoute>} />
        <Route path="/contact" element={<SupplierProtectedRoute> <PublicContact /> </SupplierProtectedRoute>} />
        <Route path="/add-supplier" element={<SupplierProtectedRoute> <AddSupplier /> </SupplierProtectedRoute>} />

        <Route
          path="/app/contact"
          element={

            <PrivateContact />
          }
        />





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

        <Route
          path="/add-employee"
          element={
            <AdminProtectedRoute>
              <AddEmployee />
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