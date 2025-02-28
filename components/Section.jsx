import Link from "next/link";
import React, { useEffect, useState } from "react";
import Face from "./Face";

const Section = () => {
  const [text, setText] = useState("");
  const fullText = `A face-based attendance management system uses facial recognition technology to track employee or student attendance. 
                    It works by capturing the face of the individual through a camera, comparing it to a pre-existing database, and recording the time of entry or exit.
                    This system is highly accurate, contactless, and efficient, reducing the risk of errors or fraud associated with traditional methods like fingerprint scanning or manual logging. 
                    It also enhances security and privacy, as it does not require physical IDs. 
                    The data can be integrated with payroll or academic systems for seamless management of attendance records.`;
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + fullText[i]);
      i += 1;
      if (i === fullText.length) clearInterval(interval);
    }, 20); // Adjust the speed here (in ms)
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="h-screen">
      <div className="mb-40">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl text-center font-bold m-20 ">
            Face Based <br />
            Attendance Management System
          </h1>
          <div className=" absolute right-5">
            <Link
              href={"/dashboard"}
              className="text-2xl bg-blue-500 text-white italic p-3 rounded-full hover:bg-green-500"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="flex ">
          <div className="h-auto w-1/2">
            <Face />
          </div>

          <div className="w-1/2 mx-20 ">
            <p className="text-justify text-2xl text-blue-500 font-semibold">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
