import React from "react";
import OakleyLogo from "../../../assets/OaklryLogo.png";
import ColumbiaLogo from "../../../assets/ColumbiaLogo.png";
import GymsharkLogo from "../../../assets/GymsharkLogo.png";
import CarharttLogo from "../../../assets/CarharttLogo.png";
import FlightawareLogo from "../../../assets/FlightawareLogo.png";
import TissotLogo from "../../../assets/TissotLogo.png";
import FitbitLogo from "../../../assets/FitbitLogo.png";
import JeepLogo from "../../../assets/JeepLogo.png";

type Props = {};

const Partnerships = (props: Props) => {
  return (
    <div className="container mx-auto py-16">
      <div className="xl:w-2/3 mx-auto mb-16 w-11/12 sm:mb-10 md:w-2/3 lg:w-2/3">
        <h1 className=" xl:text-5xl mb-5 pt-4 text-center text-xl font-extrabold text-gray-800 md:text-3xl">
          Partnerships with Coveted Brands
        </h1>
        <p className="xl:w-10/12 xl:mx-auto text-center text-base font-normal text-gray-600 md:text-lg lg:text-xl">
          Our success has come from being committed to the property and
          investing in the development of the product to maximize sales. At the
          same time and maintaining the integrity.
        </p>
      </div>
      <div className="xl:py-16 px-15 flex flex-wrap sm:py-16 md:py-16 lg:py-16">
        <div className="xl:w-1/4 xl:border-b xl:border-r :border-r xl:pb-10 flex w-6/12 items-center justify-center border-gray-200 px-7 pb-16 md:w-1/4 lg:w-1/4 lg:border-b lg:border-r">
          <img src={GymsharkLogo} alt="brand logo" />
        </div>
        <div className=" xl:w-1/4 xl:border-b xl:border-r xl:pb-10 flex w-6/12 items-center justify-center border-gray-200 px-7 pb-16 md:w-1/4 lg:w-1/4 lg:border-b lg:border-r">
          <img src={ColumbiaLogo} alt="brand logo" />
        </div>
        <div className="xl:w-1/4 xl:border-b xl:pb-10 flex w-6/12 items-center justify-center border-gray-200 px-7 pb-16 pt-4 md:w-1/4 lg:w-1/4 lg:border-b">
          <img src={JeepLogo} alt="brand logo" />
        </div>
        <div className="xl:w-1/4 xl:border-b xl:border-l xl:pb-10 flex w-6/12 items-center justify-center border-gray-200 px-7 pb-16 md:w-1/4 lg:w-1/4 lg:border-b lg:border-l">
          <img src={CarharttLogo} alt="brand logo" />
        </div>
        <div className="xl:w-1/4 xl:border-r xl:pt-10 flex w-6/12 items-center justify-center border-gray-200 px-7 md:w-1/4 lg:w-1/4 lg:border-r">
          <img src={FlightawareLogo} alt="brand logo" />
        </div>
        <div className="xl:w-1/4 xl:border-r xl:pt-10 flex w-6/12 items-center justify-center border-gray-200 px-7 md:w-1/4 lg:w-1/4 lg:border-r">
          <img src={TissotLogo} alt="brand logo" />
        </div>
        <div className="xl:w-1/4 xl:pt-10 flex w-6/12 justify-center pt-16 md:w-1/4 md:pt-2 lg:w-1/4 lg:pt-10">
          <img src={FitbitLogo} alt="brand logo" />
        </div>
        <div className="xl:w-1/4 xl:border-l xl:pt-10 flex w-6/12 justify-center border-gray-200 px-7 pt-16 md:w-1/4 md:pt-2 lg:w-1/4 lg:border-l lg:pt-10">
          <img src={OakleyLogo} alt="brand logo" />
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
