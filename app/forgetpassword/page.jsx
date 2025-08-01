"use client";

import { useState } from "react";
import { auth } from "../../util/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Forgetimg from "@/components/Forgetimg";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      setError("");
      setEmail("");
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-3xl md:text-5xl font-bold m-10  text-red-500 text-center">
        Forgot Password
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="h-full w-full md:w-3/4 ">
          <Forgetimg />
        </div>
      <div className="border-l-4 border-red-500 h-180 mx-4"></div>

        <div className="w-full md:w-1/2">
          <div className="m-5 md:m-20">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  id="email"
                  className=" focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-96 border-2 border-red-500 p-3 rounded-full"
                  placeholder="Enter Your Email Adderess"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              <div className="flex justify-center items-center mt-5">
              <button type="submit"
               className="font-bold bg-red-500 text-white p-3  rounded-3xl"
               >Reset Password</button>
              </div>
              <div className="my-2 md:my-10 border-b-4 border-red-400 w-full md:w-96"></div>
              <div className="flex justify-center items-center mt-5 md:mt-10">
              <div >
                <Link href={"/login"} className="bg-green-500 p-3 rounded-full text-white">Go to Login</Link>
              </div>
              <div className="ml-10">
              <Link href={"/register"} className="bg-indigo-500 p-3 rounded-full text-white">Go to Register</Link>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
