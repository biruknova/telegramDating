import { useEffect } from "react";

const ImagePreloader = ({ imageUrls }) => {
  useEffect(() => {
    // Create an image element for each image URL to preload them all
    imageUrls.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, [imageUrls]);

  return null; // This component doesn't render anything
};
export default ImagePreloader;
