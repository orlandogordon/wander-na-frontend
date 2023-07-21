import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTourById } from "../../tours/toursApiSlice";
import {
  StarIcon,
  ChevronDownIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import TourImage1 from "../assets/TourImage1.png";
import { useGetTourQuery } from "../../tours/toursApiSlice";
import { useGetReviewsQuery } from "../../reviews/reviewsApiSlice";
import { useLazyGetCheckoutSessionQuery } from "../../bookings/bookingsApiSlice";
import { TourObj } from "../../../shared/types";
import Review from "../../reviews/Review";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { start } from "repl";
import Loading from "../../../shared/Loading";
import { selectLoginStatus, selectCurrentUserId } from "../../auth/authSlice";
import MyReview from "../../reviews/MyReview";
import LoadingPage from "../../../shared/LoadingPage";

type Props = {};

const Tour = (props: Props) => {
  const userId = useSelector(selectCurrentUserId);
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    "pk_test_51NODeXAGQXEf6aP6jmTOvQYlZcav3urZjK9D2oZj7T2CQPi6IDJI0QyUEEN5K32ifffvgg1dvgdd5cOSDbInkCDk00MSs2zj6y"
  );
  const [menu, setMenu] = useState(true);
  const [menu1, setMenu1] = useState(false);
  const { id: tourId } = useParams();

  const {
    data: tourData,
    isLoading: tourIsLoading,
    isSuccess: tourIsSuccess,
    isError: tourIsError,
    error: tourError,
  } = useGetTourQuery(`${tourId}`);

  const [
    getCheckoutSession,
    {
      data: checkoutSessionData,
      isLoading: checkoutSessionIsLoading,
      isError: checkoutSessionIsError,
      error: checkoutSessionError,
    },
  ] = useLazyGetCheckoutSessionQuery();

  const {
    data: reviewsData,
    isLoading: reviewsIsLoading,
    isSuccess: reviewsIsSuccess,
    isError: reviewsIsError,
    error: reviewsError,
  } = useGetReviewsQuery(`${tourId}`);

  const onBookingClick = (e: any) => {
    if (tourId)
      getCheckoutSession({
        tourId,
        startDate,
      });
    else navigate(0);
  };

  useEffect(() => {
    if (checkoutSessionData) {
      window.location.href = `${checkoutSessionData.session.url}`;
    }
  }, [checkoutSessionData, navigate]);

  let tourContent;
  let reviewsContent;
  let userReviewContent;
  let startDate: string;

  if (tourIsLoading) tourContent = <LoadingPage />;
  if (reviewsIsLoading) reviewsContent = null;

  if (tourIsError) {
    console.log(tourError);
    if ("data" in tourError) {
      tourContent = <p className=" text-red-600">error!!!!!!!!!!!!!!</p>;
    }
  }
  if (reviewsIsError) {
    console.log(reviewsError);
    if ("data" in reviewsError) {
      reviewsContent = <p className=" text-red-600">error!!!!!!!!!!!!!!</p>;
    }
  }

  if (tourIsSuccess) {
    const tour: TourObj = tourData.data.data;
    startDate = tour.startDates?.length
      ? tour.startDates[0]
      : new Date().toISOString();
    const startDates = tour.startDates?.length ? (
      tour.startDates.map((date: string) => (
        <option key={date} value={date}>
          {new Date(date).toLocaleDateString()}
        </option>
      ))
    ) : (
      <div className="text-red">No upcoming dates available...</div>
    );

    tourContent = tour ? (
      <div className="container mx-auto mt-12 px-5 py-24">
        <div className="md:full mx-auto flex flex-wrap">
          <img
            src={`https://wander-api-bl56.onrender.com/img/tours/${tour.images[0]}`}
            className=" w-full  rounded object-scale-down object-center md:w-1/2 lg:border lg:border-gray-200 lg:object-cover"
            alt="pic-from-tour"
            crossOrigin="anonymous"
          />
          <div className="mt-6 w-full md:mt-0 md:w-1/2 md:py-6 md:pl-10">
            <h2 className="text-sm tracking-widest text-gray-800">
              {`Lead by: ${tour.guides[0].name}`}
            </h2>
            <h1 className=" mb-1 text-3xl font-medium text-gray-900">
              {tour.name}
            </h1>
            <div className="mb-4 mt-2 flex">
              <span className="flex items-center">
                <StarIcon className="h-5 w-5 text-amber-500" />
                <span className="ml-1 text-gray-600">{`${tour.ratingsAverage}`}</span>
                <span className="ml-3 text-gray-600">{`(${tour.ratingsQuantity} Total Reviews)`}</span>
              </span>
            </div>
            <p className="leading-relaxed">{tour.description}</p>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-200 pb-5">
              <span className="mr-3">{`${tour.maxGroupSize} spots remaining.`}</span>

              <div className="ml-6 flex items-center">
                <span className="mr-3">Start Date:</span>
                <div className="relative">
                  <select
                    onChange={(e) => (startDate = e.target.value)}
                    className="appearance-none rounded border border-gray-400 py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none"
                  >
                    {startDates}
                  </select>
                  <span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
                    <ChevronDownIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="text-2xl font-medium text-gray-900">
                {tour.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <button
                onClick={onBookingClick}
                className="ml-auto flex rounded border-0 bg-slate-500 px-6 py-2 text-white hover:bg-slate-600 focus:outline-none"
              >
                Book Now
              </button>
              {/* <button className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-gray-200 p-0 text-gray-500">
                <HeartIcon className="h-5 w-5" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-red">No data loaded from fetch...</div>
    );
  }

  if (reviewsIsSuccess) {
    const reviews = reviewsData.data.data;
    reviewsContent = reviews?.length ? (
      reviews.map((review: any) => {
        if (review.user._id === userId) {
          userReviewContent = <MyReview key={review._id} reviewData={review} />;
          return null;
        }
        return <Review key={review._id} reviewData={review} />;
      })
    ) : (
      <div>Be the first to leave a review!</div>
    );
  }
  if (!userReviewContent && userId) {
    userReviewContent = (
      <MyReview
        key={"new-review"}
        reviewData={{ user: { _id: userId }, tour: tourId }}
      />
    );
  } else if (!userReviewContent && !userId) {
    userReviewContent = (
      <div>
        <NavLink
          to={"/login"}
          className=" font-bold underline hover:text-gray-400"
        >
          Login
        </NavLink>{" "}
        to leave a review
      </div>
    );
  }

  return (
    <motion.div
      className="body-font min-h-full overflow-hidden bg-white text-gray-700"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 70 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {tourContent}
      <div className="mx-auto flex max-w-7xl  items-center justify-center px-4 py-12 md:px-6 ">
        <div className="flex w-full flex-col items-start justify-start space-y-8">
          <div className="flex items-start justify-start">
            <p className="text-3xl font-semibold leading-7 text-gray-800 lg:text-4xl lg:leading-9">
              {reviewsIsLoading ? "" : "Reviews"}
            </p>
          </div>
          {reviewsIsLoading ? "" : userReviewContent}
          {reviewsContent}
        </div>
      </div>
    </motion.div>
  );
};

export default Tour;
