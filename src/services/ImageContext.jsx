import React, { createContext, useContext, useState, useEffect } from 'react';
import { sanityClient, urlFor } from './sanityClient';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const query = `*[_type == "painting"] | order(order asc) {
          _id,
          title,
          size,
          available,
          order,
          mainImage,
          descriptions,
          detailImages[] {
            ...,
            width
          }
        }`;

        const data = await sanityClient.fetch(query);

        const formattedImages = data.map((painting) => ({
          ...painting,
          name: painting.title,
          url: painting.mainImage ? urlFor(painting.mainImage) : '',
          originalIndex: painting.order ?? 0,
          descriptions: painting.descriptions || {},
          details: (painting.detailImages || []).map((img) => ({
            subUrl: urlFor(img),
            width: img.width || 'normal',
          })),
        }));

        setImages(formattedImages);
      } catch (error) {
        console.error("Failed to fetch paintings from Sanity:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  return (
    <ImageContext.Provider value={{ images, loading }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => useContext(ImageContext);

export default ImageContext;