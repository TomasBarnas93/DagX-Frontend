import { useState, useLayoutEffect, useEffect } from "react";
import { createElement, updateElement } from "../helpers/elementCreators";
import { getEventCoordinates, resizedCoordinates } from "../helpers/utils";
import { useHistory } from "./useHistory";
import { useZoom } from "./useZoom";
import rough from "roughjs";

export const useCanvasDraw = (
  elements,
  setElements,
  pressedKeys = new Set()
) => {
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("rectangle");
  const [color, setColor] = useState("#000000");
  const [lineThickness, setLineThickness] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startPanMousePosition, setStartPanMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [undo, redo] = useHistory([]);
  const { scale, handleZoom, resetZoom } = useZoom();

  const handleStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { clientX, clientY } = getEventCoordinates(event, panOffset);
    if (event.target.type === "range") return;
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
        backgroundColor,
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

      setAction(tool === "writing" || "drawing");
    }
  };

  const handleMove = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.type === "range") return;

    const { clientX, clientY } = getEventCoordinates(event, panOffset);

    if (action === "erasing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(
        index,
        x1,
        y1,
        clientX,
        clientY,
        "pencil",
        { color: backgroundColor },
        elements,
        setElements,
        lineThickness
      );
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
      updateElement(
        index,
        x1,
        y1,
        clientX,
        clientY,
        tool,
        { color },
        elements,
        setElements,
        lineThickness
      );
    } else if (action === "resizing") {
      const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY);
      updateElement(x1, y1, x2, y2);
    }
  };

  const handleEnd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.type === "range") return;
    setAction("none");
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
      default:
        throw new Error(`Type not recognised: ${element.type}`);
    }
  };

  const clearCanvas = () => {
    setElements([]);
    setBackgroundColor("#ffffff");
  };

  const saveImage = () => {
    const canvas = document.getElementById("canvas");
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "design.png";
    link.click();
  };

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const roughCanvas = rough.canvas(canvas);

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.save();
    context.translate(panOffset.x, panOffset.y);

    elements.forEach((element) => {
      if ((action === "writing") === element.id) return;
      drawElement(roughCanvas, context, element, color);
    });
    context.restore();
  }, [elements, action, panOffset, color, backgroundColor, scale]);

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

  return {
    action,
    setAction,
    tool,
    setTool,
    color,
    setColor,
    lineThickness,
    setLineThickness,
    backgroundColor,
    setBackgroundColor,
    panOffset,
    setPanOffset,
    handleStart,
    handleMove,
    handleEnd,
    clearCanvas,
    saveImage,
    handleZoom,
    resetZoom,
  };
};
