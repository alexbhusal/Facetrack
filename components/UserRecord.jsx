"use client";
import React, { useEffect, useState } from "react";
import CustomGauge from "./UserGraph";
import BasicDateCalendar from "./UserCalander";
import { auth, firestore } from "@/util/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserRecord = () => {
  const [status, setStatus] = useState("Loading...");
  const [atTime, setAtTime] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(""); // Track selected date
  const formattedDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return setStatus("Not Logged In"), setLoading(false);

      try {
        const userSnap = await getDoc(doc(firestore, "users", user.uid));
        if (!userSnap.exists()) return setStatus("User not found"), setLoading(false);
        const name = userSnap.data().fullName || "User";
        setFullName(name);

        const attendanceSnap = await getDoc(doc(firestore, `attendance/${formattedDate}/records`, name));
        if (attendanceSnap.exists()) {
          const data = attendanceSnap.data();
          setStatus(data.status || "Status not found");
          setAtTime(data.time || "");
        } else setStatus("No record");
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("Error");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleDateChange = async (date) => {
    const selectedDateFormatted = date.format("YYYY-MM-DD"); // format date to 'YYYY-MM-DD'
    setSelectedDate(selectedDateFormatted); // update selected date

    const user = auth.currentUser;
    if (!user) return;

    try {
      const userSnap = await getDoc(doc(firestore, "users", user.uid));
      if (!userSnap.exists()) return setStatus("User not found");

      const name = userSnap.data().fullName || "User";
      const attendanceSnap = await getDoc(doc(firestore, `attendance/${selectedDateFormatted}/records`, name));
      if (attendanceSnap.exists()) {
        const data = attendanceSnap.data();
        setStatus(data.status || "Status not found");
        setAtTime(data.time || "");
      } else {
        setStatus("No record");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setStatus("Error");
    }
  };

  return (
    <div className="h-screen">
      <div className="text-center text-xl md:text-4xl font-serif italic mt-10">
        {loading? "Checking your status...": 
          status === "No record" ? `No record found for ${selectedDate || "Today"}`:
           `You are ${status} ${status === "absent" ? "" : 
            `at ${atTime}`} on ${selectedDate || "Today"}`
          }
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center md:items-start mt-10">
        <div className="w-1/2 flex flex-col items-center">
          <CustomGauge />
          <h1 className="text-center text-xl md:text-4xl font-serif italic">Days Present</h1>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <BasicDateCalendar onDateChange={handleDateChange} />
          <h1 className="text-center text-xl md:text-4xl font-serif italic">Checkout Date</h1>
        </div>
      </div>
    </div>
  );
};

export default UserRecord;
