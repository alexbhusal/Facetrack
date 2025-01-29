"use client";
import Face from "@/components/Face";
import React from "react";
export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-5xl text-center font-bold m-20 ">
          Face Based
          <br />
          Attandace Management System
        </h1>
      </div>

      <div className="flex">
        <div className="h-200 w-1/2">
          <Face />
        </div>

        <div className="w-1/2 mx-20">
          <p className="text-justify text-2xl text-blue-500 font-semibold">
            A face-based attendance management system uses facial recognition
            technology to track employee or student attendance. It works by
            capturing the face of the individual through a camera, comparing it
            to a pre-existing database, and recording the time of entry or exit.
            This system is highly accurate, contactless, and efficient, reducing
            the risk of errors or fraud associated with traditional methods like
            fingerprint scanning or manual logging. It also enhances security
            and privacy, as it does not require physical IDs. The data can be
            integrated with payroll or academic systems for seamless management
            of attendance records.
          </p>
        </div>
      </div>
    </>
  );
}
