// components/ImageUpload.js
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import { firebaseStorage } from "@/config/firebase";
import MuiModal from "@/layout/modal";

const ImageUpload = ({ imagePreview, setImagePreview, label }) => {
  const [progrss, setProgrss] = useState(0);
  const [url, setUrl] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(undefined);

  const onFileUpload = () => {
    if (!file) return;

    const storageRef = ref(firebaseStorage, `/Images/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgrss(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          setImagePreview(url);
        });
      }
    );
  };
  const onFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    onFileUpload();
  }, [file]);

  return (
    <div className=" flex justify-start items-end gap-5 w-full ">
      <div>
        <label className=" block text-gray-600 font-semibold mb-2">
          {label ? label : "Upload an Image"}
        </label>
        <div className="relative border-dashed border-2 border-gray-300 bg-gray-100 rounded-md">
          <input
            type="file"
            multiple
            className=" h-full absolute w-full opacity-0"
            accept=".jpg, .jpeg, .png, .gif, .pdf"
            onChange={onFileChange}
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
            <p className="text-xs text-gray-500">
              Drag and drop files here or click to upload
            </p>
          </div>
        </div>
      </div>
      <div>
        {imagePreview && (
          <div className="">
            <Image
              onClick={() => setOpen(true)}
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-24 h-24 rounded-md object-cover"
              width={12000}
              height={1000}
            />
          </div>
        )}
      </div>
      <MuiModal
        heading={""}
        Content={<iframe className="w-full h-screen" src={imagePreview}></iframe>}
        classes={""}
        maxWidth={""}
        openModal={open}
        setOpenModal={setOpen}
      ></MuiModal>
    </div>
  );
};

export default ImageUpload;
