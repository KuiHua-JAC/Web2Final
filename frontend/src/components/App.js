import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cars from "./pages/Cars";
import Reviews from "./pages/Reviews";
import Car from "./pages/Car";
import Review from "./pages/Review";
import UpdateCar from "./pages/UpdateCar";
import AddCar from "./pages/AddCar";
import AddReview from "./pages/AddReview";
import UpdateReview from "./pages/UpdateReview";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/reviews/:title" element={<Review />} />
        <Route path="/reviews/add" element={<AddReview />} />
        <Route path="/reviews/update/:title" element={<UpdateReview />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:make/:model/:year" element={<Car />} />
        <Route path="/cars/add" element={<AddCar />} />
        <Route path="/cars/update/:title" element={<UpdateCar />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
