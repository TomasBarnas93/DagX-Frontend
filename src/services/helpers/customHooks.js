import { useState, useEffect } from 'react';

export const useCanvasElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    const context = canvas.getContext('2d');
    if (!context) {
        console.error('Context not accessible');
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(element => {
      context.fillRect(element.x, element.y, element.width, element.height);
    });
  }, [elements]);
  
  return { elements, setElements };

};