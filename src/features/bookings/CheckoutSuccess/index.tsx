import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetCreateBookingQuery } from "../bookingsApiSlice";

type Props = {};

const CheckoutSuccess = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const tour: string = searchParams.get("tour") || "test";
  const user = searchParams.get("user");
  const price = searchParams.get("price");
  const startDate = searchParams.get("startDate");

  // api call
  useGetCreateBookingQuery({ tour, user, price, startDate });

  //await Booking.create({ tour, user, price, startDate });
  // Navigate to the
  navigate("/manage-account");

  return <div>index</div>;
};

export default CheckoutSuccess;
