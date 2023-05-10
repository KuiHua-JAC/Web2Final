import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cars from "./pages/Cars";
import About from "./pages/About";
import UserError from "./pages/UserError";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* TODO the homepage should be about recent posts or look at inspiration online */}
        {/* add a review "tab" where you can search for reviews  */}
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
        <Route path="/usererror" element={<UserError />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
