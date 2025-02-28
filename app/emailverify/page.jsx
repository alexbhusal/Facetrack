"use client";
import Emailverify from "@/components/emailverify";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="relative">
      <div className="flex justify-center flex-col md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold mt-10">
            Please Verify your email
          </h1>
        </div>
        <div className=" absolute right-0 top-10 m-4 md:m-10 flex justify-end ">
      <Link href="/login" className="p-3 bg-blue-400 text-white rounded-2xl font-bold w-full md:w-auto text-center hidden md:block">
        GO TO LOGIN
      </Link>
    </div>
      </div>
      <div className="h-200 w-200 md:h-auto md:w-auto">
        <Emailverify />
      </div>
      <div className="flex justify-center items-center">
        <Link
          href="/login"
          className="p-3 bg-blue-400 text-white rounded-2xl font-bold  text-center md:hidden"
        >
          GO TO LOGIN
        </Link>
      </div>
    </div>
  );
};

export default page;
