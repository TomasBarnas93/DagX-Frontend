import React from 'react';

const Canvas = ({ handleStart, handleMove, handleEnd }) => {

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
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      style={{ position: "absolute", zIndex: 1, touchAction: "none", border: "0.5px solid"}}
    >
    </canvas>
  );
};

export default Canvas;