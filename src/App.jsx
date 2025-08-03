import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cabins from "./pages/Cabins";
import Cabin from "./pages/Cabin";
import LandingPage from "./component/LandingPage";
import AppLayout from "./AppLayout";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import JWTexpiry from "./middleware/JWTexpiry";
import ProtectedRoute from "./middleware/ProtectedRoute";
import CheckJWT from "./middleware/CheckJWT";
import ScrollToTop from "./component/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/haven" element={<AppLayout />}>
          <Route index element={<Navigate to={"cabins"} replace />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="cabins/:cabinID" element={<Cabin />} />
          <Route path="about" element={<About />} />

          <Route
            path="bookings"
            element={
              <JWTexpiry>
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              </JWTexpiry>
            }
          />
          <Route
            path="bookings/:bookID"
            element={
              <JWTexpiry>
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              </JWTexpiry>
            }
          />
          <Route
            path="profile"
            element={
              <JWTexpiry>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </JWTexpiry>
            }
          />

          <Route
            path="login"
            element={
              <CheckJWT>
                <Login />
              </CheckJWT>
            }
          />
          <Route
            path="sign-up"
            element={
              <CheckJWT>
                <SignUp />
              </CheckJWT>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
