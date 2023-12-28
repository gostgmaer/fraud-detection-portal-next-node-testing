import Image from "next/image";
import React, { useState } from "react";

import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import { firebaseStorage } from "@/config/firebase";
import { formatFileSize } from "@/helper/function";
const MultiImageUploadr = ({ selectedFiles, setSelectedFiles, label }) => {
  const [errorMessage, setErrorMessage] = useState("Upload your product featured image here. Image size should not be more than 5 MB");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file types and size if needed
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles = files.every((file) => {
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage(`File type not supported: ${file.name}`);
        return false;
      }
      if (file.size > maxSize) {
        setErrorMessage(`File size too large: ${file.name}`);
        return false;
      }
      return true;
    });

    if (validFiles) {
      setErrorMessage(null);
      onFileUpload(files[0]);
    }

    e.target.value = null; // Clear the input field
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const onFileUpload = (file) => {
    // console.log(file);
    if (!file) return;

    const storageRef = ref(firebaseStorage, `/Images/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          var obj = {
            ...uploadTask.snapshot.metadata,
            url,
          };
          setSelectedFiles([...selectedFiles, obj]);
        });
      }
    );
  };

  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative border-dashed border-2 border-gray-300 bg-gray-100 rounded-md">
        <input
          type="file"
          multiple
          className=" h-full absolute w-full opacity-0"
          accept=".jpg, .jpeg, .png, .gif, .pdf"
          onChange={handleFileChange}
        />
        <div className="text-center m-4">
          <svg
            className="mx-auto h-10 w-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 6v3m0 6V6m0 6h8m6 2l-3 3m0 0l-3-3m3 3l3-3m-3 3v8H6V6h12zm3 6h-8m0 8h8m12-11l-3-3m0 0l-3 3m3-3l3 3"
            ></path>
          </svg>
          <div className="@5xl::ps-10 pt-2 text-center @2xl:ps-5 @2xl:text-left">
            <h5 className="mb-2 text-sm font-bold text-gray-900 @2xl:text-base @3xl:mb-3 @3xl:text-lg">
              Drop or select file
            </h5>
            <p className="text-sm leading-relaxed text-gray-900">
              Drop files here or click{" "}
              <span className="font-semibold underline hover:no-underline">
                browse
              </span>{" "}
              thorough your machine
            </p>
          </div>
        </div>
      </div>
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <ul>
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 flex justify-between rounded-md shadow-md p-3 items-start gap-2"
              >
                <div className="text-sm text-gray-700 flex justify-between  items-start gap-2">
                  <Image
                    key={index}
                    className="rounded w-10 h-10 object-cover"
                    width={50}
                    height={50}
                    alt={file.name}
                    src={file.url}
                  ></Image>{" "}
                  <p className="flex flex-col">
                    {" "}
                    {file.name} <span> {formatFileSize(file.size)}</span>{" "}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default MultiImageUploadr;
