import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import DuneImg from "../../../assets/home-cta-1.jpg";
import CanyonImg from "../../../assets/home-cta-2.jpg";
import NycImg from "../../../assets/home-cta-3.jpg";

type Props = {};

const Cta = (props: Props) => {
  return (
    <div className="2xl:px-0 container mx-auto mb-12 flex items-center justify-center px-4 py-20 sm:px-6">
      <div className="flex flex-col items-center justify-center space-y-6 lg:flex-row lg:space-y-0">
        <div className="flex w-80 flex-col items-start justify-start sm:w-auto">
          <div>
            <p className="xl:text-4xl text-3xl font-semibold leading-9 text-gray-800">
              Book your next journey today
            </p>
          </div>
          <div className="xl:w-3/5 mt-4 lg:w-4/5">
            <p className="text-base leading-6 text-gray-600">
              Don't miss out on the opportunity to create cherished memories -
              reserve your spot now and let the adventure begin!
            </p>
          </div>
          <motion.div
            className="mt-8 w-full lg:mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            variants={{
              hidden: { opacity: 0, x: -60 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <NavLink to={"/tours"}>
              <button className="flex h-14 w-full items-center justify-between bg-gray-900 px-4 text-white hover:bg-gray-700 lg:w-72">
                <p className="text-xl font-medium leading-5">See More</p>
                <ArrowLongRightIcon className="fill-stroke h-7 w-7 " />
              </button>
            </NavLink>
          </motion.div>
        </div>

        <div className="jusitfy-center xl:space-x-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-5 sm:space-y-0">
          <div>
            <img className="hidden lg:block" src={DuneImg} alt="sand dunes" />
            <img
              className="w-80 sm:w-auto lg:hidden"
              src={DuneImg}
              alt="sand dunes"
            />
          </div>
          <div className="xl:space-y-8 flex flex-col items-center justify-center space-y-4 sm:space-y-0 sm:space-y-5 lg:space-y-5">
            <div>
              <img className="hidden lg:block" src={CanyonImg} alt="canyon" />
              <img
                className="w-80 sm:w-auto lg:hidden"
                src={CanyonImg}
                alt="canyon"
              />
            </div>
            <div>
              <img className="hidden lg:block" src={NycImg} alt="nyc streets" />
              <img
                className="w-80 sm:w-auto lg:hidden"
                src={NycImg}
                alt="nyc streets"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
