import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useSearchParams } from "react-router-dom";
import Layout from "./features/general/Layout";
import Home from "./features/general/Home";
import AllTours from "./features/tours/AllTours";
import ContactUs from "./features/general/ContactUs";
import NotFound from "./features/general/NotFound";
import Tour from "./features/tours/Tour";
import "./index.css";
import SignUp from "./features/users/SignUp";
import AccountOverview from "./features/users/AccountOverview";
import CheckoutSuccess from "./features/bookings/CheckoutSuccess";
import Login from "./features/auth/Login";
import OurTeam from "./features/users/OurTeam.tsx";

function App() {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY == 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app bg-gray-20">
      <Routes>
        <Route path="/" element={<Layout isTopOfPage={isTopOfPage} />}>
          <Route index element={<Home />} />
          <Route path="tours">
            <Route index element={<AllTours />} />
            <Route path=":id" element={<Tour />} />
          </Route>
          <Route path="people">
            <Route index element={<OurTeam />} />
          </Route>
          <Route path="contact" element={<ContactUs />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="manage-account" element={<AccountOverview />} />
          <Route path="confirm-booking" element={<CheckoutSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
