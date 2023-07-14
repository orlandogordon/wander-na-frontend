import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

type Props = {
  booking: any;
  tour: any;
};

const BookingCard = ({ booking, tour }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="xl:p-8 flex w-full flex-col items-start justify-start bg-gray-50 px-4 py-4 md:p-6 md:py-6">
      <div className="xl:space-x-8 mt-4 flex  w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 ">
        <div className="w-full pb-4 md:w-40 md:pb-8">
          <img
            className="w-full md:block"
            src={`http://localhost:3500/img/tours/${tour.imageCover}`}
            alt="dress"
            crossOrigin="anonymous"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200  pb-8 md:flex-row md:space-y-0">
          <div className="flex w-full flex-col items-start justify-start space-y-8">
            <h3 className="xl:text-2xl text-xl font-semibold leading-6 text-gray-800">
              {booking.tour.name}
            </h3>
            <div className="flex flex-col items-start justify-start space-y-2">
              <p className="text-sm leading-none text-gray-800">
                Guide: {booking.tour.guides[0].name}
              </p>
              <p className="text-sm leading-none text-gray-800">
                Duration: {tour.duration} days
              </p>
              <p className="text-sm leading-none text-gray-800">
                Start Location: {tour.startLocation.address}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col justify-start space-y-8 sm:items-start md:items-end">
            <p className="xl:text-lg text-base font-semibold leading-6 text-gray-800">
              Start Date: {new Date(booking.startDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => navigate(`/tours/${tour.id}`)}
              className="2xl:w-full mt-6 w-40 border border-gray-800 py-5 text-base font-medium leading-4 text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 md:mt-0"
            >
              Tour Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
