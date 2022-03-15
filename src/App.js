import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminPage from "./pages/AdminPage";
import ChangePassword from "./pages/ChangePassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPassword from "./pages/NewPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PatientsProvider } from "./context/PatientsProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forget-Password" element={<ForgotPassword />} />
            <Route path="forget-Password/:token" element={<NewPassword />} />
            <Route path="confirm/:id" element={<ConfirmAccount />} />
          </Route>
          {/* Private routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
