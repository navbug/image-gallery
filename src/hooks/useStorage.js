import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/auth";

const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const startUpload = (file) => {
    if (!file) return;

    const fileId = uuidv4();
    const fileFormat = file.type.split("/")[1];
    console.log(file, fileId);

    const storageRef = ref(storage, `images/${fileId}${fileFormat}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProgress(progress);

        //store url in database
        await addDoc(collection(db, "images"), {
          imageUrl: downloadURL,
          createdAt: new Date(),
          userEmail: user?.email,
        });
      }
    );
  };
  return { progress, error, startUpload };
};

export default useStorage;
