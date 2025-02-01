"use client"
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <>
    <DotLottieReact
      src="https://lottie.host/d0e10791-fbe7-4d0a-be52-caaadb2a8e83/CuBTRAtf0m.lottie"
      loop
      autoplay
    />
    <div className="flex items-center justify-center">
    <Link className='sm:text-xl  md:text-4xl bg-blue-500 p-3 rounded-2xl cursor-pointer text-white' href={"/"}> Go To Home</Link>
    </div>
    </>
    
  )
}

export default NotFound

