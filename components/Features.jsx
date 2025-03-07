"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { allIngredients } from "../util/Listitems";

export default function Features() {
  const [selectedTab, setSelectedTab] = useState(allIngredients[0]);

  return (
    <div className="h-full mt-12" id="features" data-aos="fade-up" >
      <div className="" >
        <h1 className="text-3xl font-semibold text-center">Features</h1>
      </div>
      <div className="w-full h-screen max-h-[700px] md:max-h-[600px] shadow-xl flex flex-col overflow-hidden">
        <nav className="   border-b-4 border-gray-200 h-20 mt-10"  >
          <ul className="flex w-full list-none p-0 m-0 text-xl font-semibold">
            {allIngredients.map((item) => (
              <motion.li
                key={item.label}
                initial={false}
                animate={{
                  backgroundColor: item === selectedTab ? "#eee" : "#eee0",
                  color: item === selectedTab ? "red" : "black",
                }}
                className="flex-1 min-w-0 px-4 py-2 cursor-pointer text-center relative"
                onClick={() => setSelectedTab(item)}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-6 w-10 inline-block mr-2"
                />
                <span className="hidden md:block">
                {item.label}
                </span>
                {item === selectedTab && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    layoutId="underline"
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </nav>
        <main className="flex-1 flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab.label}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <img
                src={selectedTab.image}
                alt={selectedTab.label}
                className="h-auto w-96 mx-auto"
              />
              <div className="w-full   md:w-[550px] h-auto">
                <h1 className="text-xl text-blue-500 font-semibold mt-2">
                  {selectedTab.label}
                </h1>
                <p className="text-justify text mx-10 text-xl">
                  {selectedTab.discription}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
