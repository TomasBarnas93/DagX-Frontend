import { useState } from 'react';

export const useZoom = () => {
  const [startDistance, setStartDistance] = useState(0);
  const [scale, setScale] = useState(1);

  const handleZoom = (event) => {
    if (event.touches.length === 2) {
      const dx = event.touches[0].pageX - event.touches[1].pageX;
      const dy = event.touches[0].pageY - event.touches[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (startDistance === 0) {
        setStartDistance(distance);
      } else {
        const newScale = distance / startDistance;
        setScale(newScale);
      }
    }
  };

  const resetZoom = () => {
    setStartDistance(0);
  };

  return {
    scale,
    handleZoom,
    resetZoom,
  };
};
