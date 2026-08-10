import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import DoctorsSection from "./pages/Doctors";
import Contact from "./pages/Contact";
import AppointmentForm from "./components/AppointmentForm";

import AdminLogin from "./pages/AdminLogin";

import Dashboard from "./pages/Dashboard/DashboardServices";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import DashboardDoctors from "./pages/Dashboard/DashboardDoctors";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardServices from "./pages/Dashboard/DashboardServices";
import DashboardAppointments from "./pages/Dashboard/DashboardAppointments";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* صفحة تسجيل دخول الأدمن */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* صفحات الموقع */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="doctors" element={<DoctorsSection />} />
        <Route path="contact" element={<Contact />} />
        <Route path="appointment" element={<AppointmentForm />} />
      </Route>

      {/* لوحة التحكم */}
  <Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<DashboardHome />} />
  <Route path="doctors" element={<DashboardDoctors />} />
  <Route path="services" element={<DashboardServices />} />
  <Route path="appointments" element={<DashboardAppointments />} />
</Route>

    </>,
  ),
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
