import React from "react";
import "../styles/Slide.scss";
import { AnimatePresence, motion } from "framer-motion";

const Slide = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <>
      <motion.div
        className="slide"
        whileHover={{ scale: 0.7 }}
        whileTap={{ scale: 1.2 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        transition={{ duration: 2, ease: "backInOut" }}
      >
        <AnimatePresence>
          <motion.h1
            key="title"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Welcome To Wonder Stay! Anywhere You Roam <br /> Stay In The Moment.
            Make Your Memories
          </motion.h1>
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Slide;
