import { SelectedPage } from "../../../shared/types";
import { MapIcon, UserCircleIcon, TrophyIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { BenefitType } from "../../../shared/types";
import GroupPhoto from "../../../assets/home-aboutus-1.jpg";
import Headshot1 from "../../../assets/home-aboutus-2.jpg";
import Headshot2 from "../../../assets/home-aboutus-3.jpg";
import Headshot3 from "../../../assets/home-aboutus-4.jpg";
import Headshot4 from "../../../assets/home-aboutus-5.jpg";

const benefits: Array<BenefitType> = [
  {
    icon: <MapIcon className="h-6 w-6" />,
    title: "50+ Tours Available",
    description:
      "Embark on your dream adventure with our vast selection of 50+ tours, offering diverse destinations, captivating activities, and unparalleled experiences.",
  },
  {
    icon: <UserCircleIcon className="h-6 w-6" />,
    title: "100's of Expert Tour Guides",
    description:
      "Our team of knowledgeable tour guides are the heart and soul of NA Tour Co. They bring destinations to life with their extensive local expertise and engaging storytelling, ensuring every moment of your journey is enriched with fascinating insights and unforgettable experiences.",
  },
  {
    icon: <TrophyIcon className="h-6 w-6" />,
    title: "Recognized Excellence",
    description:
      "Proud winners of multiple acclaimed awards, including the Wanderlust Wander Award, Outdoor Adventure Excellence Prize, and the GlobeTrek Choice Award - Celebrating our commitment to delivering unforgettable North American journeys.",
  },
];

type Props = {};

const AboutUs = ({}: Props) => {
  return (
    <div className="2xl:container 2xl:mx-auto px-4 py-12 md:px-6 md:py-16 lg:px-20 lg:py-20">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <div className="flex w-full flex-col justify-center md:w-5/12">
          <h1 className="pb-4 text-3xl font-bold leading-9 text-gray-800 lg:text-4xl">
            About Us
          </h1>
          <p className="text-base font-normal leading-6 text-gray-600 ">
            Welcome to Wander, your gateway to thrilling adventures across the
            breathtaking landscapes of North America. As a premier tour company,
            we specialize in crafting unforgettable experiences that ignite your
            sense of wanderlust. With a passion for exploration and a commitment
            to safety, our expert guides will take you off the beaten path,
            immersing you in the rugged beauty and untamed wilderness of this
            magnificent continent. Whether you seek adrenaline-pumping
            activities, cultural encounters, or serene nature escapes, Wander is
            here to curate extraordinary journeys that push boundaries and
            create lifelong memories. Embark on an unforgettable adventure with
            us and let your wanderlust take flight.
          </p>
        </div>
        <motion.div
          className="w-full md:w-8/12 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 1.0 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <img
            className="h-full w-full"
            src={GroupPhoto}
            alt="A group of People"
          />
        </motion.div>
      </div>
      <motion.div
        className="flex flex-col justify-between gap-8 pt-12 lg:flex-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay: 0.2, duration: 1.5 }}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {/* <div className="flex flex-col justify-between gap-8 pt-12 lg:flex-row"> */}
        <div className="flex w-full flex-col justify-center lg:w-5/12">
          <h1 className="pb-4 text-3xl font-bold leading-9 text-gray-800 lg:text-4xl">
            Our Story
          </h1>
          <p className="text-base font-normal leading-6 text-gray-600 ">
            Wander was born out of a shared love for exploration and a deep
            appreciation for the natural wonders of North America. It all began
            when a group of avid adventurers came together, driven by the desire
            to share their passion with others. Fuelled by their collective
            experiences and a belief in the transformative power of travel, they
            set out to create a company that would provide thrilling, immersive,
            and unforgettable tours across the diverse landscapes of this
            captivating continent. And thus, Wander was born, with a mission to
            inspire and guide fellow wanderers on extraordinary journeys of
            discovery.
          </p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid grid-cols-1 rounded-md shadow-lg sm:grid-cols-2 md:grid-cols-4 lg:gap-4">
            <div className="flex flex-col items-center justify-center p-4 pb-6">
              <img
                className="block rounded-full border-2  border-slate-500"
                src={Headshot1}
                alt="Alexa featured Img"
              />
              <p className="mt-4 text-xl font-medium leading-5 text-gray-800">
                Isaiah - Founder
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 pb-6">
              <img
                className="block rounded-full border-2 border-slate-500"
                src={Headshot2}
                alt="Olivia featured Img"
              />
              <p className="mt-4 text-xl font-medium leading-5 text-gray-800">
                Olivia - Founder
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 pb-6">
              <img
                className="block rounded-full border-2 border-slate-500"
                src={Headshot3}
                alt="Liam featued Img"
              />
              <p className="mt-4 text-xl font-medium leading-5 text-gray-800">
                Aarav - Head of Tours
              </p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 pb-6">
              <img
                className="block rounded-full border-2 border-slate-500"
                src={Headshot4}
                alt="Elijah featured img"
              />
              <p className="mt-4 text-xl font-medium leading-5 text-gray-800">
                Camila - Head of Sales
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
