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
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isLowerCase, setIsLowerCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);

  const handleChange = (e) => {
    const password = e.target.value;
    setPassword(password);

     // Check for uppercase letters
    setIsUpperCase(/[A-Z]/.test(password));

    // Check for lowercase letters
    setIsLowerCase(/[a-z]/.test(password));

    // Check for special characters
    setHasSpecialChar(/[!@#$%^&*]/.test(password));

     // Check for number include
    setHasNumber(/\d/.test(password));

    // Check for minimum length of 8
    setIsLongEnough(password.length >= 8);
  };
  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);

    // Check if passwords match
    setIsPasswordsMatch(password === confirmPassword);
  };

  
  
  const validateFullName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };
  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleReg = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    } else if (!validatePassword(password)) {
      toast.error("Password must meet all the requirements");
      setLoading(false);
      return;
    } else if (!validateFullName(fullName)) {
      toast.error("Full name must contain only letters and spaces");
      setLoading(false);
      return;
    } else if (!validateEmail(email)) {
      toast.error("Invalid email format");
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
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  className={`focus:outline-none focus:ring-2  w-full md:w-72 border-2 p-3 rounded-full ${isPasswordsMatch ? 'border-indigo-500 focus:ring-indigo-500' : 'border-red-500 focus:ring-red-500'}`} // Apply red border if passwords don't match

                  // className=" focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-72 border-2 border-indigo-500 p-3 rounded-full"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              {password && (
                <div className="flex text-base justify-center items-center gap-8 my-2">
                <span className={isUpperCase ? "text-green-500" : "text-red-500"}>A-Z</span>
                <span className={isLowerCase ? "text-green-500" : "text-red-500"}>a-z</span>
                <span className={hasSpecialChar ? "text-green-500" : "text-red-500"}>!@#$%^&</span>
                <span className={hasNumber ? "text-green-500" : "text-red-500"}>0-9</span> 
                <span className={isLongEnough ? "text-green-500" : "text-red-500"}>min 8</span>
                </div>
              )}
              
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
