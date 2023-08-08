import React, { useState, useRef } from 'react';
import { ChromePicker } from 'react-color';

function Design() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;

    context.strokeStyle = color;
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(offsetX, offsetY);

    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');

    if (window.navigator.msSaveBlob) {
      // For Microsoft browsers (Edge, IE)
      const blob = dataURItoBlob(image);
      window.navigator.msSaveBlob(blob, 'my_drawing.png');
    } else {
      // For other browsers
      const link = document.createElement('a');
      link.href = image;
      link.download = 'my_drawing.png';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: mimeString });
  };

  return (
    <div>
      <div>
        <ChromePicker color={color} onChange={handleColorChange} />
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
      />
      <button onClick={saveCanvas}>Save</button>
    </div>
  );
}

export default Design;
