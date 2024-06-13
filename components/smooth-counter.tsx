"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SmoothCounter = ({ count }: { count: number }) => {
  const [likes, setLikes] = useState<number>(count);

  useEffect(() => {
    if (count !== likes) {
      const timer = setInterval(() => {
        setLikes((prev) => {
          if (prev < count) {
            return prev + 1;
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 100); // Adjust the interval duration as needed
      return () => clearInterval(timer);
    }
  }, [count, likes]);

  return (
    <div className="flex items-center space-x-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={likes}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="text-xl font-semibold text-primary"
        >
          {likes}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
