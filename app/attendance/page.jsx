"use client";
import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { firestore } from "../../util/firebase";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const intervalRef = useRef();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    startVideo();
    loadModels();
    scheduleAbsentMarking(); // schedule absent marking at 11:01 AM
    return () => clearInterval(intervalRef.current);
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Camera error:", err);
        toast.error("Please grant camera access.");
      });
  };

  const loadModels = async () => {
    toast.warning("Loading face detection models...");
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    ]);
    toast.success("Models loaded!");
    faceMyDetect();
  };

  const fetchStoredFaceData = async () => {
    const snapshot = await getDocs(collection(firestore, "faces"));
    return snapshot.docs.map((doc) => doc.data());
  };

  const compareFaceDescriptors = async (currentDescriptor) => {
    const storedFaces = await fetchStoredFaceData();
    for (const face of storedFaces) {
      const storedDescriptor = new Float32Array(face.faceDescriptor);
      const distance = faceapi.euclideanDistance(
        currentDescriptor,
        storedDescriptor
      );
      if (distance < 0.6) {
        await markAttendance(face.name);
        return face.name;
      }
    }
    return null;
  };

  const markAttendance = async (name) => {
    const now = new Date();
    const hours = now.getHours();
    const dateKey = now.toISOString().split("T")[0];
    const status = hours >= 6 && hours < 11 ? "present" : "absent";
    const attendanceDocRef = doc(
      firestore,
      "attendance",
      dateKey,
      "records",
      name
    );

    const docSnap = await getDoc(attendanceDocRef);
    if (!docSnap.exists()) {
      await setDoc(attendanceDocRef, {
        name,
        status,
        time: now.toLocaleTimeString(),
        date: dateKey,
      });
      toast.success(`Marked ${status.toUpperCase()} for ${name}`);
    }
  };

  const faceMyDetect = () => {
    intervalRef.current = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length) {
        const match = await compareFaceDescriptors(detections[0].descriptor);
        match ? setUserName(match) : console.log("Unrecognized face");
      }

      const canvas = canvasRef.current;
      canvas.innerHTML = "";
      canvas.appendChild(faceapi.createCanvasFromMedia(videoRef.current));
      const dims = { width: 940, height: 650 };
      faceapi.matchDimensions(canvas, dims);
      const resized = faceapi.resizeResults(detections, dims);
      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceLandmarks(canvas, resized);
    }, 1000);
  };

  const scheduleAbsentMarking = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(11, 1, 0, 0);
    const msUntilTarget = target.getTime() - now.getTime();

    if (msUntilTarget > 0) {
      setTimeout(() => {
        markAbsentUsers();
      }, msUntilTarget);
    }
  };

  const markAbsentUsers = async () => {
    const today = new Date().toISOString().split("T")[0];
    const allUsers = await fetchStoredFaceData(); 
    const attendanceSnapshot = await getDocs(
      collection(firestore, "attendance", today, "records")
    );
    const presentUsers = attendanceSnapshot.docs.map((doc) => doc.id);

    const absentUsers = allUsers.filter(
      (user) => !presentUsers.includes(user.name)
    );
    for (const user of absentUsers) {
      const ref = doc(firestore, "attendance", today, "records", user.name);
      await setDoc(ref, {
        name: user.name,
        status: "absent",
        time: "N/A",
        date: today,
      });
    }
    toast.info("Absent users marked.");
  };

  return (
    <>
      <ToastContainer />
      <p className="text-3xl text-center text-red-600 my-6">
        Face Attendance App
      </p>
      <div className="flex justify-center items-center m-5">
        <div>
          <video
            ref={videoRef}
            autoPlay
            className="rounded-2xl border-4 border-dashed border-black w-full"
            crossOrigin="anonymous"
          />
        </div>
        <div>
          <canvas ref={canvasRef} className="w-full md:mt-0" />
        </div>
      </div>
      <p className="text-xl text-center mt-4">
        {userName
          ? `Hello, ${userName}!`
          : "Please wait... Recognizing your face"}
      </p>
    </>
  );
}

export default Page;
