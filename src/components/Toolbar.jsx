import React from "react";

const Toolbar = ({
  tool,
  setTool,
  color,
  setColor,
  lineThickness,
  setLineThickness,
  clearCanvas,
  saveImage,
  undo,
  redo,
  backgroundColor,
  setBackgroundColor,
}) => {
  return (
    <div style={{ overscrollBehavior: "none" }}>
      <div style={{ position: "fixed", zIndex: 2 }}>
        <input
          type="radio"
          id="line"
          checked={tool === "line"}
          onChange={() => setTool("line")}
        />
        <label htmlFor="line">Line</label>
        &nbsp;
        <input
          type="radio"
          id="circle"
          checked={tool === "circle"}
          onChange={() => setTool("circle")}
        />
        <label htmlFor="rectangle">Circle</label>
        &nbsp;
        <input
          type="radio"
          id="rectangle"
          checked={tool === "rectangle"}
          onChange={() => setTool("rectangle")}
        />
        <label htmlFor="rectangle">Rectangle</label>
        &nbsp;
        <input
          type="radio"
          id="triangle"
          checked={tool === "triangle"}
          onChange={() => setTool("triangle")}
        />
        <label htmlFor="triangle">Triangle</label>
        &nbsp;
        <input
          type="radio"
          id="pencil"
          checked={tool === "pencil"}
          onChange={() => setTool("pencil")}
        />
        <label htmlFor="pencil">Pencil</label>
        &nbsp;
        <input
          type="radio"
          id="eraser"
          checked={tool === "eraser"}
          onChange={() => setTool("eraser")}
        />
        <label htmlFor="eraser">Eraser</label>
        &nbsp;
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        &nbsp;
        <input
          type="range"
          min="1"
          max="20"
          value={lineThickness}
          onChange={(e) => setLineThickness(Number(e.target.value))}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        />
        &nbsp;
        <button onClick={clearCanvas}>Clear</button>
        &nbsp;
        <button onClick={saveImage}>Save</button>
        &nbsp;
        <button onClick={undo}>Undo</button>
        &nbsp;
        <button onClick={redo}>Redo</button>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Toolbar;
