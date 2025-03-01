"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "../../util/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Load from "@/components/Load";
import Footer from "@/components/Footer";
import { toast, ToastContainer } from "react-toastify";
import UserRecord from "@/components/UserRecord";
import UserNavbar from "@/components/UserNavbar";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState(null);
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      toast.warning("You are logged out");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.fullName);
          toast.success(`Welcome back, ${userData.fullName}!`);
        } else {
          router.push("/login");
        }
        setLoading(false);
      } else {
        router.push("/login");
        setLoading(false);
      }
    });
    return () => {
      unsub();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Load />
      </div>
    );
  }
  if (user) {
    return (
      <>
        <UserNavbar handleLogOut={handleLogOut}/>
        <ToastContainer />
        <UserRecord />
        <Footer />
      </>
    );
  }
  return null;
};

export default Page;
