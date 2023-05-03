import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col w-full justify-between h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
