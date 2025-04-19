"use client";
import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { firestore, collection, getDocs } from "../../util/firebase";
import { toast, ToastContainer } from "react-toastify";

function Page() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const intervalRef = useRef();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    startVideo();
    loadModels();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch((err) => {
        console.error("Camera error:", err);
        toast.error("Please grant camera access.");
      });
  };

  const loadModels = async () => {
    toast.warning("Loading models...");
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
      const distance = faceapi.euclideanDistance(currentDescriptor, storedDescriptor);
      if (distance < 0.6) return face.name;
    }
    return null;
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

  return (
    <>
      <ToastContainer />
      <p className="text-3xl text-center text-red-600 my-6">Face App</p>
      <div className="flex justify-center items-center m-5">
        <div className="">
        <video ref={videoRef} autoPlay className="rounded-2xl border-4 border-dashed border-black w-full" crossOrigin="anonymous" />
        </div>
        <div className="">
        <canvas ref={canvasRef}  className="w-full  md:mt-0" />
        </div>
      </div>
      <p className="text-xl text-center mt-4">
        {userName ? `Hello, ${userName}!` : "Please wait... Recognizing your face"}
      </p>
    </>
  );
}

export default Page;
