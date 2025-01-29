"use client";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "../../util/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import Load from "@/components/Load";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState(null);
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
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
    return <Load/>
  }

  if (user) {
    return (
      <div>
        Welcome, {username}
        <br />
        <button onClick={handleLogOut}>Logout</button>
      </div>
    );
  } 
    return null  
};

export default Page;
