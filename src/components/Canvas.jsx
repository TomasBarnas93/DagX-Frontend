import React from 'react';

const Canvas = ({ handleStart, handleMove, handleEnd, handleZoom, resetZoom }) => {

  return (
    <canvas
      id="canvas"
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleStart}
      onMouseMove={event => {
        event.preventDefault();
        handleMove(event);
      }}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={event => {
        event.preventDefault();
        handleMove(event);
        handleZoom(event);
      }}
      onTouchEnd={event => {
        handleEnd(event);
        resetZoom();
      }}
      style={{ position: "absolute", zIndex: 1, touchAction: "none" }}
    >
    </canvas>
  );
};

export default Canvas;