"use client";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, firestore } from "../../util/firebase";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import RegisterImg from "@/components/RegisImg";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import Spin from "@/components/Spin";

const Page = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReg = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Password not matched");
      setLoading(false);

      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        fullName,
        email,
        createdAt: new Date(),
      });

      await sendEmailVerification(user);
      toast.warning(
        "Registration successful! Check your email for verification."
      );
      setTimeout(() => {
        router.push("/emailverify");
      }, 1000);
    } catch (e) {
      toast.error(e.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl md:text-5xl m-2 md:m-10 text-indigo-500 font-bold">
        Register
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full h-full md:w-3/5 ">
          <RegisterImg />
        </div>
        <div className="border-l-4 border-indigo-500"></div>
        <div className="mx-2 md:mx-12">
          <div>
            <ToastContainer />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            <form onSubmit={handleReg}>
              <div className="mb-4">
                <input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  className=" focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-72 border-2 border-indigo-500 p-3 rounded-full"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  placeholder="Email"
                  type="email"
                  className=" focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-72 border-2 border-indigo-500 p-3 rounded-full"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className=" focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-72 border-2 border-indigo-500 p-3 rounded-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  className=" focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-72 border-2 border-indigo-500 p-3 rounded-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className=" bg-indigo-500 px-3 py-2 text-white font-extrabold rounded-full"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-20">
                      <Spin />
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
              <div className="mt-5">
                <p className="text-xl md:text-2xl">
                  Already have an Account??{" "}
                  <Link href={"/login"} className="text-green-500">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
