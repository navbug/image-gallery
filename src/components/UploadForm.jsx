import React, { useState } from "react";
import useStorage from "../hooks/useStorage";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { startUpload, progress } = useStorage();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      startUpload(selectedFile);
    }
    setSelectedFile(null);
  };

  return (
    <div className="mt-10 text-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-4"
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <button
          type="submit"
          className={`btn btn-neutral gap-3 ${progress}`}
          disabled={!selectedFile}
        >
          <span className={` ${progress && "loading"}`}></span>Upload{" "}
          <span>🚀</span>
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
