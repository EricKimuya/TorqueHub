import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";
import MyTickets from "../pages/MyTickets";
import Checkout from "../pages/Checkout";
import AdminDashboard from "../pages/admin/AdminDashboard";

import ProtectedRoute from "../auth/ProtectedRoute";
import AdminRoute from "../auth/AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes — no auth required */}
      <Route path="/" element={<Home />} />
      <Route path="/events/:id" element={<EventDetails />} />

      {/* Auth-required routes — must be logged in */}
      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <MyTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* Admin-only route — must be logged in AND have admin role */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}