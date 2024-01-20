const images = [
  "../Assets/Ipad.png",
  "../Assets/airpods.jpg",
  "../Assets/Iphone.png",
  "../Assets/image.jpg",
  "../Assets/watch.png",
  "../Assets/mcbpro.png",
  "../Assets/mcbair.png",
];
import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
function ImageSlideShow() {
  const [imgNumber, setimgNumber] = useState(0);
  function moveForwardImg() {
    if (imgNumber == images.length - 1) {
      setimgNumber(0);
    } else {
      setimgNumber(imgNumber + 1);
    }
  }
  function movePrevImg() {
    if (imgNumber == 0) {
      setimgNumber(images.length - 1);
    } else {
      setimgNumber(imgNumber - 1);
    }
  }
  useEffect(() => {
    const interval = setInterval(moveForwardImg, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [imgNumber]);
  return (
    <>
      <div className="relative w-full h-[97%] bg-mainBody overflow-hidden mt-10">
        <img src={images[imgNumber]} className="w-full" alt="Your Image" />
        <button
          type="button"
          onClick={movePrevImg}
          className="absolute top-[300px] left-2 text-Dred z-10 inline-flex items-center rounded-full bg-black p-2 hover:scale-110"
        >
          <ArrowLeft className="mr-2 h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={moveForwardImg}
          className="absolute top-[300px] right-2 text-Dred z-10 inline-flex items-center rounded-full bg-black p-2 hover:scale-110"
        >
          <ArrowRight className="ml-2 h-6 w-6" />
        </button>
      </div>
    </>
  );
}
export default ImageSlideShow;
