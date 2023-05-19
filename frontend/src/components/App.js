// Kui Hua's code, modified by aymeric briere
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
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AboutUs from "./pages/AboutUs";
import React, { useEffect, useState } from "react";
import LogOut from "./pages/LogOut";

const LoggedInContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedInValueAndSetter = [isLoggedIn, setIsLoggedIn]; //SO we can pass both value and setter

  useEffect(() => {
    async function checkForLoggedIn() {
      try {
        const response = await fetch("http://localhost:1339/session/auth", {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    }

    checkForLoggedIn();
  }, []);

  return (
    <LoggedInContext.Provider value={loggedInValueAndSetter}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {isLoggedIn && <Route path="/profile" element={<Profile />} />}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/reviews/:title" element={<Review />} />
          <Route path="/reviews/add" element={<AddReview />} />
          <Route path="/reviews/update/:title" element={<UpdateReview />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:make/:model/:year" element={<Car />} />
          <Route path="/cars/add" element={<AddCar />} />
          <Route
            path="/cars/update/:make/:model/:year"
            element={<UpdateCar />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </LoggedInContext.Provider>
  );
}

export { LoggedInContext };
