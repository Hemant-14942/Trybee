import { motion } from "framer-motion";

const ScrollBanner = () => {
  return (
    <div className="relative w-screen overflow-hidden bg-[#b7b5b1] py-2 border-t border-b border-black text-black">
      <motion.div
        className="flex whitespace-nowrap gap-8 text-lg font-medium"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
        style={{ transform: "skewX(-50deg)" }}
      >
        {Array(2)
          .fill(0)
          .map((_, idx) => (
            <div key={idx} className="flex gap-9 py-4">
              {Array(50)
                .fill("Style Now 👟🔥")
                .map((text, i) => (
                  <span key={i} className="text-2xl -skew-x-12 block">
                    {text}
                  </span>
                ))}
            </div>
          ))}
      </motion.div>
    </div>
  );
};

export default ScrollBanner;
