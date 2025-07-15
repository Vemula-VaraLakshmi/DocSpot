import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/common/Login';
import Register from './components/common/Register';
import Home from './components/common/Home';
import UserHome from './components/user/UserHome';
import AdminHome from './components/admin/AdminHome';
import UserAppointments from './components/user/UserAppointments';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import ManageAppointments from './components/admin/ManageAppointments';
import ManageDoctors from './components/admin/ManageDoctors';
import DoctorSettings from "./components/doctor/DoctorSettings";
const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || (role && user.type !== role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient Dashboard */}
        <Route
          path="/user/home"
          element={
            <ProtectedRoute role="user">
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/appointments"
          element={
            <ProtectedRoute role="user">
              <UserAppointments />
            </ProtectedRoute>
          }
        />

        {/* Doctor Dashboard */}
        <Route
          path="/doctor/home"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute role="admin">
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <ManageAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute role="admin">
              <ManageDoctors />
            </ProtectedRoute>
          }
        />
        <Route
  path="/doctor/settings"
  element={
    <ProtectedRoute role="doctor">
      <DoctorSettings />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
};



export default App;
