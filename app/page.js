"use client";
import FaceLoad from "@/components/Faceload";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import Privacy from "@/components/Privacy";
import Section from "@/components/Section";
import Testimonials from "@/components/Testimonials";
import Working from "@/components/Working";
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
        <div className=" flex justify-center items-center h-screen">
          <FaceLoad />
        </div>
      ) : (
        <>
          <MainNav />
          <Section />
          <Features />
          <Working />
          <Privacy />
          <Testimonials />
          <Footer />
        </>
      )}
    </>
  );
}
