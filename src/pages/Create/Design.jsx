import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs";
import "./Design.css";

const generator = rough.generator();

const createElement = (id, x1, y1, x2, y2, type, color, thickness) => {
  switch (type) {
    case "line":
    case "rectangle":
      const roughElement =
        type === "line"
          ? generator.line(x1, y1, x2, y2, {
              stroke: color,
              strokeWidth: thickness,
            })
          : generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
              stroke: color,
              strokeWidth: thickness,
            });
      return { id, x1, y1, x2, y2, type, roughElement, color, thickness };
    case "triangle":
      const roughTriangleElement = generator.polygon(
        [
          [x1, y1],
          [x2, y1],
          [x1, y2],
        ],
        { stroke: color, strokeWidth: thickness }
      );
      return {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughTriangleElement,
        color,
        thickness,
      };
    case "circle":
      const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const roughCircleElement = generator.circle(
        (x1 + x2) / 2,
        (y1 + y2) / 2,
        radius,
        {
          stroke: color,
          strokeWidth: thickness,
        }
      );
      return { id, x1, y1, x2, y2, type, roughCircleElement, color, thickness };
    case "pencil":
      return { id, type, points: [{ x: x1, y: y1 }], color, thickness };
    case "text":
      return { id, type, x1, y1, x2, y2, text: "" };
    default:
      throw new Error(`Type not recognised: ${type}`);
  }
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null;
  }
};

const useHistory = (initialState) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (action, overwrite = false) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex((prevState) => prevState + 1);
    }
  };

  const undo = () => index > 0 && setIndex((prevState) => prevState - 1);
  const redo = () =>
    index < history.length - 1 && setIndex((prevState) => prevState + 1);

  return [history[index], setState, undo, redo];
};

const drawElement = (roughCanvas, context, element) => {
  const drawingColor = element.color || "#000000";
  context.strokeStyle = drawingColor;
  context.fillStyle = drawingColor;
  context.lineWidth = element.thickness || 1;

  switch (element.type) {
    case "line":
    case "rectangle":
      roughCanvas.draw(element.roughElement);
      break;
    case "triangle":
      roughCanvas.draw(element.roughTriangleElement);
      break;
    case "circle":
      const radius = Math.sqrt(
        Math.pow(element.x2 - element.x1, 2) +
          Math.pow(element.y2 - element.y1, 2)
      );
      context.beginPath();
      context.arc(element.x1, element.y1, radius, 0, Math.PI * 2, false);
      context.stroke();
      break;
    case "pencil":
      if (element.points.length > 1) {
        context.beginPath();
        context.moveTo(element.points[0].x, element.points[0].y);
        for (let i = 1; i < element.points.length; i++) {
          context.lineTo(element.points[i].x, element.points[i].y);
        }
        context.stroke();
      }
      break;
    case "text":
      context.textBaseline = "top";
      context.font = "24px sans-serif";
      context.fillText(element.text, element.x1, element.y1);
      break;
    default:
      throw new Error(`Type not recognised: ${element.type}`);
  }
};

const usePressedKeys = () => {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (event) => {
      setPressedKeys((prevKeys) => new Set(prevKeys).add(event.key));
    };

    const handleKeyUp = (event) => {
      setPressedKeys((prevKeys) => {
        const updatedKeys = new Set(prevKeys);
        updatedKeys.delete(event.key);
        return updatedKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return pressedKeys;
};

const Design = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("rectangle");
  const [selectedElement, setSelectedElement] = useState(null);
  const [panOffset, setPanOffset] = React.useState({ x: 0, y: 0 });
  const [startPanMousePosition, setStartPanMousePosition] = React.useState({
    x: 0,
    y: 0,
  });
  const textAreaRef = useRef();
  const pressedKeys = usePressedKeys();
  const [color, setColor] = useState("#000000");
  const [lineThickness, setLineThickness] = useState(2);

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const roughCanvas = rough.canvas(canvas);

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(panOffset.x, panOffset.y);

    elements.forEach((element) => {
      if (action === "writing" && selectedElement.id === element.id) return;
      drawElement(roughCanvas, context, element, color);
    });
    context.restore();
  }, [elements, action, selectedElement, panOffset, color]);

  useEffect(() => {
    const undoRedoFunction = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  useEffect(() => {
    const panFunction = (event) => {
      setPanOffset((prevState) => ({
        x: prevState.x - event.deltaX,
        y: prevState.y - event.deltaY,
      }));
    };

    document.addEventListener("wheel", panFunction);
    return () => {
      document.removeEventListener("wheel", panFunction);
    };
  }, []);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing") {
      setTimeout(() => {
        textArea.focus();
        textArea.value = selectedElement.text;
      }, 0);
    }
  }, [action, selectedElement]);

  const updateElement = (id, x1, y1, x2, y2, type, options) => {
    const elementsCopy = [...elements];
    const color = (options?.color || elements[id]?.color) ?? "#000000";
    const thickness =
      (options?.thickness || elements[id]?.thickness) ?? lineThickness;

    switch (type) {
      case "line":
      case "rectangle":
        elementsCopy[id] = createElement(
          id,
          x1,
          y1,
          x2,
          y2,
          type,
          color,
          thickness
        );
        break;
        case "triangle":
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);
        let vertices;
    if (y2 >= y1) {
        // Upright triangle
        vertices = [
            [centerX, centerY - height / 2],
            [centerX - width / 2, centerY + height / 2],
            [centerX + width / 2, centerY + height / 2],
        ];
    } else {
        // Upside-down triangle
        vertices = [
            [centerX, centerY + height / 2],
            [centerX - width / 2, centerY - height / 2],
            [centerX + width / 2, centerY - height / 2],
        ];
    }
    const roughTriangleElement = generator.polygon(vertices, {
        stroke: color,
        strokeWidth: thickness,
    });
    elementsCopy[id] = {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughTriangleElement,
        color,
        thickness,
    };
    break;
      case "circle":
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const roughCirculeElement = generator.circle(
          (x1 + x2) / 2,
          (y1 + y2) / 2,
          radius,
          {
            stroke: color,
            strokeWidth: thickness,
          }
        );
        elementsCopy[id] = {
          id,
          x1,
          y1,
          x2,
          y2,
          type,
          color,
          thickness,
          roughCirculeElement,
        };
        break;
      case "pencil":
        elementsCopy[id].points = [
          ...elementsCopy[id].points,
          { x: x2, y: y2 },
        ];
        break;
      case "text":
        const textWidth = document
          .getElementById("canvas")
          .getContext("2d")
          .measureText(options.text).width;
        const textHeight = 24;
        elementsCopy[id] = {
          ...createElement(
            id,
            x1,
            y1,
            x1 + textWidth,
            y1 + textHeight,
            type,
            color,
            lineThickness
          ),
          text: options.text,
        };
        break;
      default:
        throw new Error(`Type not recognised: ${type}`);
    }

    setElements(elementsCopy, true);
  };

  const getEventCoordinates = (event) => {
    const touchEvent = event.changedTouches ? event.changedTouches[0] : null;
    const { clientX, clientY } = touchEvent || event;
    const rect = event.target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    return { clientX: x - panOffset.x, clientY: y - panOffset.y };
  };

  const handleStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = getEventCoordinates(event);
    if (event.target.type === 'range') return; 
    if (event.button === 1 || pressedKeys.has(" ")) {
      setAction("panning");
      setStartPanMousePosition({ x: clientX, y: clientY });
      return;
    } 
    if (tool === "eraser") {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        "pencil",
        "#ffffff",
        lineThickness
      );
      setElements((prevState) => [...prevState, element]);
      setAction("erasing");
      return;
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool,
        color,
        lineThickness
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);
  
      setAction(tool === "text" ? "writing" : "drawing");
    }
  };

  const handleMove = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.type === 'range') return; 

    const { clientX, clientY } = getEventCoordinates(event);
  
    if (action === "erasing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, "pencil", { color: "#ffffff" });
      return;
    }
    if (action === "panning") {
      const deltaX = clientX - startPanMousePosition.x;
      const deltaY = clientY - startPanMousePosition.y;
      setPanOffset({
        x: panOffset.x + deltaX,
        y: panOffset.y + deltaY,
      });
      return;
    }
    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool, { color });
    } else if (action === "moving") {
      if (selectedElement.type === "pencil") {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets[index],
          y: clientY - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        const options = type === "text" ? { text: selectedElement.text } : {};
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          type,
          options
        );
      }
    } else if (action === "resizing") {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  const handleEnd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = getEventCoordinates(event);
    if (event.target.type === 'range') return; 
    if (selectedElement) {
      if (
        selectedElement.type === "text" &&
        clientX - selectedElement.offsetX === selectedElement.x1 &&
        clientY - selectedElement.offsetY === selectedElement.y1
      ) {
        setAction("writing");
        return;
      }
    }

    if (action === "writing") return;

    setAction("none");
    setSelectedElement(null);
  };

  const handleBlur = (event) => {
    const { id, x1, y1, type } = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, x1, y1, null, null, type, { text: event.target.value });
  };

  const clearCanvas = () => {
    setElements([]);
  };

  const saveImage = () => {
    const canvas = document.getElementById("canvas");
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "design.png";
    link.click();
  };

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
      </div>
      {action === "writing" ? (
        <textarea
          ref={textAreaRef}
          onBlur={handleBlur}
          style={{
            position: "fixed",
            top: selectedElement.y1 - 2 + panOffset.y,
            left: selectedElement.x1 + panOffset.x,
            font: "24px sans-serif",
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            resize: "auto",
            overflow: "hidden",
            whiteSpace: "pre",
            background: "transparent",
            zIndex: 2,
          }}
        />
      ) : null}
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => handleStart(e, color)}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={(e) => handleStart(e, color)}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        style={{ position: "absolute", zIndex: 1, touchAction: "none" }}
      >
        Canvas
      </canvas>
    </div>
  );
};

export default Design;
