import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const categories = [
  {
    name: "T Shirt's",
    image1: "/model.png",
    image2: "/model.png",
  },
  {
    name: "Joggers",
    image1: "/model.png",
    image2: "/model.png",
  },
  {
    name: "SweatShirts",
    image1: "/model.png",
    image2: "/model.png",
  },
  {
    name: "Accessories",
    image1: "/model.png",
    image2: "/model.png",
  },
];

export default function Category() {
  const [active, setActive] = useState(categories[0]);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [-100, 200]);
  const rightY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="flex overflow-hidden md:max-w-6xl md:mx-auto flex-col items-center justify-around pb-24 md:pb-52 text-black gap-10 md:gap-10"
    >
      <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
        Shop by Category ✨
      </h2>
      <div className="flex justify-center md:justify-between items-center w-full ">
        <motion.div
          style={{ y: leftY }}
          className="hidden md:block md:w-[250px] md:h-[300px] overflow-hidden relative"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={active.image1}
              src={active.image1}
              alt={active.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-[340px] md:w-[240px] rounded-lg shadow-lg border border-gray-300 bg-gray-100"
            />
          </AnimatePresence>
        </motion.div>

        <div className="text-center md:text-left space-y-6">
          <div className="space-y-4 text-2xl md:text-3xl font-medium">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onMouseEnter={() => setActive(cat)}
                className={`cursor-pointer transition-all duration-200 ${
                  active.name === cat.name
                    ? "text-orange-500 underline underline-offset-4 decoration-2"
                    : ""
                }`}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          style={{ y: rightY }}
          className="md:w-[250px] md:h-[300px] overflow-hidden relative hidden md:block"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={active.image2 + "-right"}
              src={active.image2}
              alt={active.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-[340px] md:w-[240px] rounded-lg shadow-lg border border-gray-300 bg-gray-100"
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
