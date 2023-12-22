import React from "react";
import useFirestore from "../hooks/useFirestore";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { getDownloadURL, getStorage, ref, deleteObject } from "firebase/storage";
import { saveAs } from "file-saver";
import { v4 } from "uuid";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Gallery = () => {
  const { docs, isLoading } = useFirestore("images");

  if (isLoading) {
    return (
      <div className="text-center mt-20">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  const handleImageDownload = (image) => {
    const storage = getStorage();
    console.log(image);
    getDownloadURL(ref(storage, `${image.imageUrl}`))
      .then((url) => {
        console.log(url);

        fetch(url)
          .then((response) => response.blob())
          .then((blob) => {
            saveAs(blob, `${v4()}`);
          })
          .catch((error) => {
            // Handle any errors
          });
      })
      .catch((error) => {
        // Error
      });
  };

  const handleImageDelete = (image) => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `${image.imageUrl}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 mt-10 ">
      {docs?.map((image) => {
        return (
          <div
            key={image.imageUrl}
            className="card card-compact w-full bg-base-100 shadow-2xl max-h-[20rem] overflow-hidden border-gray-400 rounded-md "
          >
            <div
              onClick={() => handleImageDownload(image)}
              className="btn absolute top-2 right-2 border-gray-500 z-20 btn"
            >
              <FaCloudDownloadAlt className="text-3xl" />
            </div>
            <figure className="h-[15rem] object-contain">
              <Zoom>
                <img
                  src={image.imageUrl}
                  alt=""
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </Zoom>
            </figure>
            <div className="card-body z-30 text-white bg-cyan-950">
              <p>Uploaded By: {image.userEmail}</p>
              <p>Created on: {image.createdAt.toLocaleDateString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
