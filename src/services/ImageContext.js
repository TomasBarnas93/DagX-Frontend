import React, { createContext, useState, useEffect } from "react";
import { storage, db } from "../services/helpers/firebase";
import { ref, listAll } from "firebase/storage";
import { get, ref as dbRef } from "firebase/database";

export const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      let imagesArray = [];
      const listRef = ref(storage);
      const list = await listAll(listRef);

      for (let i = 1; i <= list.items.length; i++) {
        const imageRef = dbRef(db, `images/image${i}`);
        const imageSnap = await get(imageRef);
        const imageData = imageSnap.val();

        if (imageData) {
          const detailsArray = [];
          if (imageData.detailImages) {
            for (const detailKey in imageData.detailImages) {
              const detailData = imageData.detailImages[detailKey];
              detailsArray.push({ subUrl: detailData.subUrl, width: detailData.width });
            }
          }

          imagesArray.push({ ...imageData, details: detailsArray, originalIndex: i - 1 });
        } else {
        }
      }
      console.log(imagesArray);
      setImages(imagesArray);
    };

    fetchImages();
  }, []);

  return (
    <ImageContext.Provider value={images}>{children}</ImageContext.Provider>
  );
};

export default ImageProvider;
