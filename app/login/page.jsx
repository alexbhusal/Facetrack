"use client";
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, firestore } from "../../util/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Loginimg from '@/components/loginimg';


const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const  router = useRouter();
  


  

 
  const handleLog = async (event) => {
    event.preventDefault();
    setError(""); 
    setLoading(true); 

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        const rData = localStorage.getItem("rData");
        const { fullName = "" } = rData ? JSON.parse(rData) : {};

        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(firestore, "users", user.uid), {
            fullName,
            email: user.email,
          });
        }
        toast("all Roght")
        setTimeout(() => {
          router.push("/home");
      }, 2000);
      } else {
        toast("Please verify your email.");
        setTimeout(()=>{
          router.push("/emailverify");
        },2000)

      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
    <h1 className='text-center  text-5xl font-bold m-10 text-blue-500'>User Login </h1>
    <div className="flex">
      <div className="h-full w-11/12">
        <Loginimg/>
      </div>
      <div class="border-l-4 border-blue-500 h-180 mx-2"></div>
      <div className="mt-10 w-1/2">
      <div className="login-container mx-12">
      <ToastContainer />
      <form onSubmit={handleLog}>
        <div className="input-group py-4 ">
          <input
            type="email"
            id="email"
            placeholder='Email Address'
            className=" text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 border-2 border-blue-500 p-3 rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            id="password"
            className="text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 border-2 border-blue-500 p-3 rounded-full"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mx-36">
        <Link href="/forgetpassword" className='text-red-600 text-sm'>Forget Password?</Link>
      </div>

        <div className="error-message">{error && <p>{error}</p>}</div>
        <div className="py-4 mx-24">
        <button type="submit" className='font-bold  py-1 bg-blue-500 text-white px-4 text-2xl rounded-3xl '  disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        </div>
      </form>
      
      <div className="register-link text-2xl my-12">
        <p>Don't have an account?<Link href="/register" className='text-green-600'>Register here</Link></p>
      </div>
    </div>
      </div>
    </div>
    </>
    
  );
};

export default Page;
