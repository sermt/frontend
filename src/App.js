import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminPage from "./pages/AdminPage";
import ChangePassword from "./pages/ChangePassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const showStore = () => {};
  store.subscribe(showStore);
  return (
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  );
}
export default App;