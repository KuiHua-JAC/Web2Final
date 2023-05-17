import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cars from "./pages/Cars";
import About from "./pages/About";
import Reviews from "./pages/Reviews";
import Car from "./pages/Car";
import Review from "./pages/Review";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/:title" element={<Review />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:make/:model/:year" element={<Car />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
