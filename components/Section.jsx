import React, { useEffect, useState } from "react";
import Face from "./Face";
import DataShow from "./DataShow";

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
      setText((prev) => {
        if (i < fullText.length) {
          return prev + fullText[i];
        } else {
          clearInterval(interval);
          return prev;
        }
      });
      i += 1;
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-5 h-full w-full px-4" data-aos="fade-right">
      <div>
        <h1 className="sm:text-left text-center text-2xl  font-bold mt-10 mb-5 ml-4 sm:ml-20">
          Welcome to Face Track <br />
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center">
        <div className="w-full sm:w-1/2 mx-4 sm:mx-20">
          <p className="text-justify text-xl sm:text-2xl text-blue-500 font-semibold">
            {text}
          </p>
        </div>
        <div className="h-64 w-full sm:h-96 sm:w-1/2 mt-4 sm:mt-0">
          <Face />
        </div>
      </div>
      <DataShow />
    </div>
  );
};

export default Section;
