import React, { useEffect, useState } from "react";
import { useGetMyBookingsQuery } from "../../bookings/bookingsApiSlice";
import BookingCard from "../../bookings/BookingCard";
import Loading from "../../../shared/Loading";
import { motion } from "framer-motion";

type Props = {
  user: any;
};

const UserBookings = ({ user }: Props) => {
  const [bookingsContent, setBookingsContent] = useState(<div>Loading...</div>);

  const { data, isLoading, isSuccess, isError, error } =
    useGetMyBookingsQuery();

  useEffect(() => {
    if (isSuccess) {
      const bookings = data.data.data.bookings;
      const tours = data.data.data.tours;
      setBookingsContent(
        bookings.map((booking: any) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            tour={tours.find((tour: any) => tour.id === booking.tour.id)}
          />
        ))
      );
    }
    if (isLoading) setBookingsContent(<Loading />);
    if (isError) console.log(`There was an error: ${error}`);
  }, [data, isLoading, isSuccess, isError, error]);

  return (
    <div className="bg-white ">
      <div className="container mx-auto rounded bg-white px-4 ">
        <div className="xl:w-full border-b border-gray-300 py-5 ">
          <div className="xl:w-full xl:mx-0 mx-auto flex w-11/12 items-center">
            <p className="text-lg font-bold text-gray-800 ">My Bookings</p>
          </div>
        </div>
        <motion.div
          className="xl:w-full container mx-auto w-11/12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="flex w-full  bg-white py-4  sm:px-0">
            <div className="2xl:px-20 2xl:container 2xl:mx-auto w-full  px-4 pb-14 md:px-6">
              <div className="xl:flex-row jusitfy-center xl:space-x-8 xl:space-y-0 mt-10 flex w-full flex-col items-stretch space-y-4 md:space-y-6">
                <div className="xl:space-y-8 flex w-full flex-col items-start justify-start space-y-4 md:space-y-6">
                  {bookingsContent}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserBookings;
