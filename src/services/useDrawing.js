import { useState, useCallback } from 'react';

const useDrawing = (color, lineThickness) => {
  const [elements, setElements] = useState([]);

  const handleStart = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = event;
    const id = elements.length;
    const element = {
      id,
      type: 'pencil',
      points: [{ x: clientX, y: clientY }],
      color,
      thickness: lineThickness,
    };
    setElements((prevState) => [...prevState, element]);
  }, [color, lineThickness, elements]);

  const handleMove = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const updatedElement = {
      ...elements[index],
      points: [...elements[index].points, { x: clientX, y: clientY }]
    };
    const updatedElements = [...elements];
    updatedElements[index] = updatedElement;
    setElements(updatedElements);
  }, [elements]);

  const handleEnd = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return {
    handleStart,
    handleMove,
    handleEnd,
    elements,
  };
};

export default useDrawing;
