"use client";
import React, { useState } from "react";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../util/firebase";
import { useRouter } from "next/navigation";
import ChangeImg from "@/components/ChangeImg";
import Link from "next/link";

const Page = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handlePassChange = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setMessage("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError("No user found.");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while updating the password.");
    }
  };

  return (
    <>
      <h1 className="text-5xl text-blue-500 font-bold text-center m-10">
        Change Password
      </h1>

      <div className="flex">
        <div className="w-3/5 h-full">
          <ChangeImg />
        </div>
        <div className="border-l-4 border-blue-500 mx-4"></div>
        <div className="w-2/5">
          <div className="container mx-10">
            <form onSubmit={handlePassChange}>
              <div className="py-2">
                <input
                  type="password"
                  id="currentPassword"
                  className=" focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 border-2 border-blue-500 p-3 rounded-full"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="py-2">
                <input
                  type="password"
                  id="newPassword"
                  placeholder="New Password"
                  className=" focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 border-2 border-blue-500 p-3 rounded-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="py-2">
                <input
                  type="password"
                  id="confirmNewPassword"
                  className=" focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 border-2 border-blue-500 p-3 rounded-full"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="error-message">
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>

              <div className="success-message">
                {message && <p style={{ color: "green" }}>{message}</p>}
              </div>
              <div className="py-5 px-16">
              <button className="bg-blue-500 px-3 py-2 text-xl text-white rounded-full" type="submit">Change Password</button>

              </div>

            </form>

            <div className="mx-16 my-10">
            <Link href={"/dashboard"} className="text-green-500 font-extrabold hover:text-red-500 ">GO TO DASHBOARD
            </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
