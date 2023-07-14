import { SelectedPage } from "../../../shared/types";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  UserIcon,
  FlagIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import ActionButton from "../../../shared/ActionButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTourById } from "../toursApiSlice";
import { Months } from "../../../shared/types";
import { TourObj } from "../../../shared/types";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  tourObj: TourObj;
};

const TourCard = ({ tourObj }: Props) => {
  const navigate = useNavigate();
  //const tour = useSelector((state) => selectTourById(state, tourObj.id));
  const handleDetails = () => navigate(`/tours/${tourObj.id}`);
  return (
    <div
      id="card"
      className="flex flex-col overflow-hidden rounded-lg bg-white shadow-2xl "
    >
      <div id="card-header" className=" relative">
        <div id="card-picture" className="relative md:h-60 lg:h-72">
          <div
            id="overlay"
            className="absolute h-full w-full bg-tour-card-overlay"
          ></div>
          <img
            src={`http://localhost:3500/img/tours/${tourObj.imageCover}`}
            className="h-full w-full object-cover"
            alt="pic-from-tour"
            crossOrigin="anonymous"
          />
        </div>
        <h3 className=" absolute bottom-4 right-8 z-10 w-4/6 text-right text-3xl lg:text-4xl ">
          <span className=" bg-text-background3 box-decoration-clone px-3 leading-tight text-gray-900">
            {tourObj.name}
          </span>
        </h3>
      </div>
      <div
        id="card-details"
        className="grid py-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7 sm:px-12 md:grid-cols-4 md:gap-x-2 md:gap-y-4 md:px-4 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-7 lg:px-12"
      >
        <h4 className=" col-span-full text-lg font-bold uppercase ">
          {tourObj.difficulty + " " + tourObj.duration + "-Day-Tour"}
        </h4>
        <p className=" col-span-full mb-1 text-lg italic sm:-mt-0 md:-mt-3">
          {tourObj.summary}
        </p>
        <div id="card-data" className=" flex items-center text-base">
          <MapPinIcon className="mr-1 h-6 w-6 fill-primary-500" />

          <span>{tourObj.startLocation.description}</span>
        </div>
        <div className="flex items-center text-base">
          <CalendarIcon className="mr-1 h-6 w-6 fill-primary-500" />
          <span>
            {Months[new Date(tourObj.startDates[0]).getMonth()] +
              " " +
              new Date(tourObj.startDates[0]).getFullYear()}
          </span>
        </div>
        <div className="flex items-center text-base">
          <FlagIcon className="mr-1 h-6 w-6 fill-primary-500" />

          <span>{tourObj.locations.length} stops</span>
        </div>
        <div className="flex items-center text-base">
          <UserIcon className="mr-1 h-6 w-6 fill-primary-500" />

          <span>{`${tourObj.maxGroupSize}`} people</span>
        </div>
      </div>
      <div
        id="card-footer"
        className=" mt-auto grid grid-cols-2 gap-y-4 border-t-2 border-primary-500 bg-white px-10 py-6 text-base text-black"
      >
        <p>
          <span className=" font-bold">${`${tourObj.price}`}</span>{" "}
          <span className=" text-zinc-700">per person</span>
        </p>
        <p className=" row-start-2 row-end-3">
          <span className="font-bold">{`${tourObj.ratingsAverage}`}</span>{" "}
          <span className=" text-zinc-700">
            rating ({`${tourObj.ratingsQuantity}`})
          </span>
        </p>
        <div className="row-start-1 row-end-3 self-center justify-self-end">
          <ActionButton target={tourObj.id}>Details</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
