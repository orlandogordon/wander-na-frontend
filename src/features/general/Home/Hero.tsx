import HeroImg from "../../../assets/bg-ropeswing.png";
import { NavLink } from "react-router-dom";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="mt-24">
      <div className="mx-auto px-12 py-9 md:py-12 lg:py-24">
        <motion.div className="items-strech mx-4 flex flex-col justify-center md:flex-row">
          <motion.div
            className="flex items-center justify-center lg:w-4/12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div>
              <h1 className="xl:text-6xl w-10/12  text-3xl font-semibold text-gray-900  md:text-5xl">
                Discover the untamed beauty of North America
              </h1>
              <p className="xl:w-10/12 mt-4 text-xl leading-normal text-gray-600 md:mt-5 md:w-11/12">
                We create unforgettable journeys through expert guidance,
                personalized experiences, and lasting connections.
              </p>
            </div>
          </motion.div>
          <div className="mt-6 md:mt-8 md:w-10/12 lg:mt-0">
            <div className="relative h-full w-full  ">
              <img
                src={HeroImg}
                alt="A lounge sofa"
                className="relative hidden h-full w-full overflow-hidden rounded-xl lg:block"
              />
              <img
                src={HeroImg}
                alt="A lounge sofa"
                className="h-full w-full rounded-xl lg:hidden"
              />
              <div className="absolute bottom-0 right-0 hidden w-1/2 bg-red-200 md:block">
                <NavLink to={"/tours"}>
                  <button className="xl:text-2xl xl:p-6 flex w-full items-center justify-between bg-gray-800 p-5 text-xl font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 ">
                    Discover Our Tours
                    <div>
                      <ArrowLongRightIcon className="fill-stroke h-8 w-8 " />
                    </div>
                  </button>
                </NavLink>
              </div>
            </div>
            <div className="mt-6  md:mt-8 md:hidden">
              <button className="flex w-full items-center justify-between bg-gray-800 px-5 py-4 text-base font-semibold leading-tight text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2  md:w-5/12 md:text-xl lg:px-7 lg:py-7">
                Discover More
                <div>
                  <ArrowLongRightIcon className="fill-stroke h-7 w-7 " />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
