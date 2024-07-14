import { motion } from "framer-motion";

export const Figure = () => {
  return (
    <motion.div
        className="absolute hidden right-10 lg:block -top-6 "
        initial={{ x: 900, y: -200}}
        animate={{ x: 20, y: 0}}
        transition={{
            repeatType: "reverse",
            duration: 4,
            ease: "easeInOut",
        }}
    >
      <svg
        height="150"
        width="250"
      >
        <polygon
          points="130,10 210,30 0,100"
          className="fill-success opacity-70 animate-[airplane_4s_ease-in-out]"
        />
        {/* <polygon
              points="130,10 210,30 240,110 0,100"
              className="fill-success opacity-70 animate-[wiggle_60s_ease-in-out_infinite]"
            /> */}
        <polygon
          points=" 210,30 240,110 0,100"
          className="fill-success opacity-80 animate-[airplane_4s_ease-in-out]"
        />
      </svg>
    </motion.div>
  );
};
