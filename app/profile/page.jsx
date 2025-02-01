"use client";
import { useState, useEffect } from "react";
import { auth, firestore } from "../../util/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import EditProfile from "@/components/EditProfile";
import Spin from "@/components/Spin";
import { toast, ToastContainer } from "react-toastify";

const ProfilePage = () => {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [batch, setBatch] = useState("");
  const [faculty, setFaculty] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFullName(userData.fullName);
          setEmail(userData.email);
          setMobileNumber(userData.mobileNumber || "");
          setBatch(userData.batch || "");
          setFaculty(userData.faculty || "");
        } else {
          router.push("/login");
        }
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsub();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        fullName,
        email,
        mobileNumber,
        batch,
        faculty,
        LastUpdatedAt: new Date(),
      });
      toast.info("Data Updated Succesfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (e) {
      console.log(e);
      toast.error(e);
    }finally{
      setBtnLoading(false);
    }
  };

  if (loading) {
    return <Spin />;
  }
  return (
    <>
      <ToastContainer />
      <h1 className="text-5xl text-center font-bold m-10">Profile Update</h1>
      <div className="flex">
        <div className="h-full w-8/12">
          <EditProfile />
        </div>
        <div className="border-l-4 border-black"></div>
        <div className="w-2/12 mx-10">
        
          <form onSubmit={handleSubmit} className="mx-10">
          <div className="w-32 mx-20 h my-2">
          <img src="https://bhuvanbhusal.com.np/image/IMG_0925.JPG" className="rounded-3xl" alt="" />
        </div>
            <div className="mb-4">
              <input
                type="text"
                value={fullName || "Full Name"}
                disabled
                className="w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-2 border-indigo-500 p-3 rounded-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email || "Email@gamil.com"}
                readOnly
                className="w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-2 border-indigo-500 p-3 rounded-full"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                value={mobileNumber}
                required
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-2 border-indigo-500 p-3 rounded-full"
                placeholder="Enter your Mobile Number"
              />
            </div>
            <div className="mb-4">
              <select
                id="batch"
                value={batch}
                required
                onChange={(e) => setBatch(e.target.value)}
                className="w-80 border-2 border-indigo-500 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select Batch
                </option>
                <option value="2077">2077</option>
                <option value="2078">2078</option>
                <option value="2079">2079</option>
                <option value="2080">2080</option>
                <option value="2081">2081</option>
              </select>
            </div>
            <div className="mb-4">
              <select
                id="faculty"
                value={faculty}
                required
                onChange={(e) => setFaculty(e.target.value)}
                className="w-80 border-2 border-indigo-500 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select Faculty
                </option>
                <option value="BCA">BCA</option>
                <option value="Bsc. CSIT">CSIT</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="mx-24 w-32 bg-indigo-500 text-white p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!mobileNumber || !batch || !faculty}
            >
              {btnloading ? <div className='w-20'>Updating...</div> : "Update"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
