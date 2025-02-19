"use client"
import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { firestore, collection, addDoc, getDocs } from "../../util/firebase"; 
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2"; // Import SweetAlert2

function Page() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [userName, setUserName] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    startVideo();
    loadModels();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // OPEN YOUR FACE WEBCAM
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
        alert("Please grant permission to access the camera.");
      });
  };

  // LOAD MODELS FROM FACE API
  const loadModels = async () => {
    try {
      console.log("Loading models...");
      toast.warning("Loading models...");
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
      ]);
      console.log("Models loaded successfully!");
      toast.success("Models loaded successfully!");
      faceMyDetect(); // Start face detection
    } catch (error) {
      console.error("Error loading models: ", error);
    }
  };

  // Function to fetch stored face data
  const fetchStoredFaceData = async () => {
    try {
      // Fetch documents from the 'faces' collection
      const querySnapshot = await getDocs(collection(firestore, "faces"));
      const storedFaces = querySnapshot.docs.map((doc) => doc.data());
      return storedFaces;
    } catch (error) {
      console.error("Error fetching stored face data: ", error);
    }
  };

  // Function to compare face descriptors
  const compareFaceDescriptors = async (currentDescriptor) => {
    const storedFaces = await fetchStoredFaceData();

    for (const face of storedFaces) {
      const storedDescriptor = new Float32Array(face.faceDescriptor);
      const distance = faceapi.euclideanDistance(currentDescriptor, storedDescriptor);

      if (distance < 0.6) {
        return face.name;  // Return the name of the matched face
      }
    }
    return null; // No match found
  };

  // FACE DETECTION AND NAME STORAGE
  const faceMyDetect = () => {
    intervalRef.current = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();  // Get face descriptors

      console.log(detections); // Log detections for debugging

      if (detections.length > 0) {
        const currentDescriptor = detections[0].descriptor;

        // Try to match with stored faces
        const matchedName = await compareFaceDescriptors(currentDescriptor);

        if (matchedName) {
          setUserName(matchedName); // Show name if a match is found
          console.log("Welcome back, " + matchedName);
        //   toast.success(`Welcome back, ${matchedName}`);
        } else if (!faceDetected) {
          setFaceDetected(true);
          askForName(currentDescriptor); // Ask for name if no match
        }
      } else {
        setFaceDetected(false); // Reset when no face is detected
      }

      // DRAW FACE ON CANVAS
      canvasRef.current.innerHTML = "";
      canvasRef.current.appendChild(
        faceapi.createCanvasFromMedia(videoRef.current)
      );

      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      // Draw detections, landmarks, expressions, age, and gender
      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 5000);
  };

  // Function to ask for the user's name
  const askForName = (currentDescriptor) => {
    // Fetch users from Firebase and display a SweetAlert
    fetchUsersFromDatabase().then((userList) => {
      Swal.fire({
        title: "Select your username",
        input: 'select',
        inputOptions: userList.reduce((options, user) => {
          options[user] = user;
          return options;
        }, {}),
        inputPlaceholder: "Choose a username",
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const selectedUserName = result.value;
          saveFaceDataToFirebase(selectedUserName, Array.from(currentDescriptor)); // Save face data
          toast.success("Face data has been added to the selected username.");
        }
      });
    });
  };

  // Function to fetch users from the database
  const fetchUsersFromDatabase = async () => {
    const querySnapshot = await getDocs(collection(firestore, "users"));
    return querySnapshot.docs.map((doc) => doc.data().fullName); // Assuming users are stored in a 'users' collection
  };

  // Save the face data (name and descriptor) to Firebase
  const saveFaceDataToFirebase = async (name, faceDescriptor) => {
    try {
      const faceData = {
        name: name,
        faceDescriptor: faceDescriptor,  // Ensure face descriptor is an array
        timestamp: new Date(),
      };

      // Add new document to the 'faces' collection
      const docRef = await addDoc(collection(firestore, "faces"), faceData);
      console.log("Face data saved with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
    <ToastContainer/>
      <p className="text-2xl sm:text-3xl md:text-5xl text-center m-4 sm:m-6 md:m-10 text-red-600">Face App</p>
      <div className="flex flex-col sm:flex-row md:flex-row">
        <div className="mx-4 sm:mx-6 md:mx-10 overflow-hidden">
          <video
            className="rounded-2xl border-4 border-dashed border-black w-full"
            crossOrigin="anonymous"
            ref={videoRef}
            autoPlay
          />
        </div>
        <div className="overflow-hidden mt-4 sm:mt-6 md:mt-0">
          <canvas ref={canvasRef} width="940" height="650" className="w-full" />
        </div>
      </div>
      {userName ? <p className="text-xl text-center">Hello, {userName}!</p>:
      <p className="text-xl text-center">Please wait!! Recognizing your face</p>}
    </>
  );
}

export default Page;
