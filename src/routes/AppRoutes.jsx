import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";
import MyTickets from "../pages/MyTickets";
import Checkout from "../pages/Checkout";
import AdminDashboard from "../pages/admin/AdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/tickets" element={<MyTickets />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}