import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import ActivateTag from "./pages/Registration/ActivateTag";
import DashboardView from "./pages/VehicleOwner/DashboardView";
import RegisterVehicle from "./pages/Registration/VehicleNumber";
import PhoneNumber from "./pages/Registration/PhoneNumber";
import OTPVerification from "./pages/Registration/OTPVerification";
import TagActivationSuccess from "./pages/Registration/TagActivationSuccess";
import VisitorDashboard from "./pages/Visitor/VisitorDashboard";
import EmergencyContactsPage from "./pages/Visitor/EmergencyContactsPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/owner/dashboard" element={<DashboardView />} />
      <Route path="/registration/activate" element={<ActivateTag />} />
      <Route path="/registration/register-vehicle" element={<RegisterVehicle />} />
      <Route path="/registration/phone-number" element={<PhoneNumber />} />
      <Route path="/registration/otp-verification" element={<OTPVerification />} />
      <Route
        path="/registration/tag-activation-success"
        element={<TagActivationSuccess />}
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/visitor/dashboard" element={<VisitorDashboard />} />
      <Route
        path="/visitor/emergency-contacts"
        element={<EmergencyContactsPage />}
      />
    </Routes>
  );
}

export default App;
