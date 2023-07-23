import { useState, useEffect } from "react";
import { FadeLoader } from "react-spinners";
import { motion } from "framer-motion";

type Props = {};

const LoadingPage = (props: Props) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 8000);
  }, []);

  const message = (
    <motion.div
      className="mt-7 flex flex-col"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      transition={{ delay: 0, duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 70 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="mx-auto text-xl font-semibold md:text-3xl ">
        Taking longer than expected?
      </div>
      <div className=" mx-auto mt-3 md:w-2/3 md:text-xl">
        We sincerely apologize for any extended load times you may experience
        while using our site. Occasional delays might occur while we are in
        beta, primarily when visiting the site or making a new request for the
        first time in 20-30 minutes. Rest assured, upon loading this initial
        request you should experience a much smoother user experience. Thank you
        for your understanding and patience.
      </div>
    </motion.div>
  );
  return (
    <div className=" my-48 flex h-full w-full flex-col">
      <FadeLoader className="mx-auto" />
      {showMessage ? message : null}
    </div>
  );
};

export default LoadingPage;
