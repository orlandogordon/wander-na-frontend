import useMediaQuery from "../../../hooks/useMediaQuery";
import { SelectedPage } from "../../../shared/types";
import ActionButton from "../../../shared/ActionButton";
import HomePageText from "../../../assets/HomePageText.png";
import { motion } from "framer-motion";

type Props = {};

function HeroAlt({}: Props) {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  return (
    <section
      id="home"
      className="w-screen gap-16 bg-gray-20 bg-ropeswing-home bg-cover py-10 md:h-full md:pb-0"
    >
      {/* IMAGE AND MAIN HEADER */}
      <motion.div className="mx-auto w-11/12 items-center justify-start md:flex md:h-5/6">
        {/* MAIN HEADER */}
        <motion.div
          className="z-10 mt-32 md:basis-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          {/* HEADINGS */}
          <div className="md:-mt-20">
            <div className="relative">
              <div className=" before:absolute before:-left-20 before:-top-20 before:z-[-1]">
                <img alt="home-page-text" src={HomePageText} />
              </div>
            </div>
          </div>
          {/* ACTIONS */}
          <motion.div
            className="mt-8 flex items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ActionButton target={"tours"}>Browse Tours</ActionButton>
          </motion.div>
        </motion.div>
        {/* IMAGE
        <div className="flex basis-3/5 justify-center md:z-10 md:ml-40 md:mt-16 md:justify-items-end">
          <img alt="home-pageGraphic" src={HomePageGraphic} />
        </div> */}
      </motion.div>
      {/* SPONSORS */}
      {/* {isAboveMediumScreens && (
        <div className="h-[150px] w-full bg-primary-100 py-10">
          <div className="mx-auto w-5/6">
            <div className="flex w-3/5 items-center justify-between gap-8">
              <img alt="redbull-sponsor" src={SponsorRedBull} />
              <img alt="forbes-sponsor" src={SponsorForbes} />
              <img alt="fortune-sponsor" src={SponsorFortune} />
            </div>
          </div>
        </div>
      )} */}
    </section>
  );
}

export default HeroAlt;