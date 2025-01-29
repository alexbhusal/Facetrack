"use client"
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../../util/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState(null);
  const router = useRouter();
  
  const handleLogOut= async ()=>{
    try{
      await signOut(auth);
      router.push("/login");
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if(userDoc.exists()){
          const userData = userDoc.data();
          setUserName(`${userData.fullName}`)
        }else{
          router.push('/login');
        }
        setLoading(false);
        if (user.emailVerified) {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          
          if (!userDoc.exists()) {
            const rData = localStorage.getItem('userInfo');
            const { fullName,email } = rData ? JSON.parse(rData) : {};
            
            
            if(fullName){
              await setDoc(doc(firestore, 'users', currentUser.uid), {
                fullName,
                email:email,
              });
            }else{
              console.log("error to get full name")
            }
            localStorage.removeItem('useInfo');
          }
          setUser(currentUser);
          console.log(currentUser);
        } else {
          setUser(null);
          console.log("Email not verified.");
          router.push('/register');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <div>Welcome, {user.email}
    <br />
    <button onClick={handleLogOut}>Logout</button>

    
    </div>;

  } else {
    return <div>User is not authenticated or email is not verified.</div>;
  }
};

export default Page;
