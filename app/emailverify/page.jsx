"use client";
import Emailverify from "@/components/emailverify";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex justify-center ">
        <div className="">
          <h1 className="text-center text-4xl font-bold mt-10">
            Please Verify your email{" "}
          </h1>
        </div>
        <div className="absolute right-0  m-10 flex mx-10 ">
          <Link href="/login" className="p-3 bg-blue-400 text-white rounded-2xl font-bold ">
            GO TO LOGIN
          </Link>
        </div>
      </div>
      <div className="h-200 w-200">
        <Emailverify />
      </div>
    </div>
  );
};

export default page;
