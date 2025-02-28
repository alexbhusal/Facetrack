"use client";
import Face from "@/components/Face";
import FaceLoad from "@/components/Faceload";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 3000); 
  }, []); 

  return (
    <>
      {loading ? (
        <div className=" m-10 w-400 h-400">
          <FaceLoad/>
        </div>
      ) : (
        <>
         <Section/>
          <Footer/>
        </>
      )}
    </>
  );
}
