import { useEffect, useState } from "react";

const ImagePreloader = ({ imageUrls }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  console.log(loadedCount);

  useEffect(() => {
    let loadedImages = 0;

    // Create an image element for each image URL to preload them all
    imageUrls.forEach((imageUrl) => {
      const img = new Image();

      img.onload = () => {
        loadedImages++;
        if (loadedImages === imageUrls.length) {
          // All images have loaded
          setLoadedCount(loadedImages);
        }
      };

      img.onerror = () => {
        // Handle image load errors, if needed
        loadedImages++;
        if (loadedImages === imageUrls.length) {
          // All images have finished loading (including errors)
          setLoadedCount(loadedImages);
        }
      };

      img.src = imageUrl;
    });
  }, [imageUrls]);

  return null;
};

export default ImagePreloader;
