"use client"

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import React from "react";
import { DataMain } from "../util/Listitems";



const DataShow = () => {
    const counts = DataMain.map(() => useMotionValue(0));
    const roundedValues = counts.map(count => useTransform(() => Math.round(count.get())));
    useEffect(() => {
        const controls = counts.map((count, index) => {
            const number = DataMain[index].number;
            return animate(count, number, { duration: 5 });
        });

        return () => controls.forEach(control => control.stop());
    }, []);

    return (
        <div className="m-10 p-2 border-2 border-black w-11/12 rounded-xl flex gap-32">
            {DataMain.map((data, index) => (
                <motion.div key={index} className="h-32 w-auto p-10 text-center">
                    <motion.pre className="text-3xl font-semibold">
                        {roundedValues[index].current}+                        
                    </motion.pre>
                     <h1 className="text-xl font-semibold">{data.label}</h1>
                </motion.div>
            ))}
        </div>
    );
};

export default DataShow;


