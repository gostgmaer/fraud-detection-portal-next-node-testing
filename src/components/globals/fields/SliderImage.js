// Slider.js
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Image from "next/image";
import React, { useState } from "react";

const CustomImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-1/2 mx-auto">
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform ease-in-out duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full">
              <img
                src={image.url}
                alt={`slide-${index}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 w-full">
        <button onClick={prevSlide} className="absolute left-0 p-2">
          Prev
        </button>
        <button onClick={nextSlide} className="absolute right-0 p-2">
          Next
        </button>
      </div>

      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 mx-2 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CustomImageSlider;
