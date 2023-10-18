import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";
import "./Design.css";
import { Box, Button, ButtonGroup, Flex, Radio, RadioGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Input } from "@chakra-ui/react";

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
  const [panOffset, setPanOffset] = React.useState({ x: 0, y: 0 });
  const [startPanMousePosition, setStartPanMousePosition] = React.useState({
    x: 0,
    y: 0,
  });
  const pressedKeys = usePressedKeys();
  const [color, setColor] = useState("#000000");
  const [lineThickness, setLineThickness] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

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

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(panOffset.x, panOffset.y);

    elements.forEach((element) => {
      if ((action === "writing") === element.id) return;
      drawElement(roughCanvas, context, element, color);
    });
    context.restore();
  }, [elements, action, panOffset, color, backgroundColor]);

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

    const { clientX, clientY } = getEventCoordinates(event);

    if (action === "erasing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, "pencil", {
        color: backgroundColor,
      });
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

  return (
    <Box overscrollBehavior="none">
      <Flex position="fixed" zIndex={2}>
        <RadioGroup defaultValue="rectangle" onChange={(value) => setTool(value)}>
          <Radio value="line">Line</Radio>
          <Radio value="circle">Circle</Radio>
          <Radio value="rectangle">Rectangle</Radio>
          <Radio value="triangle">Triangle</Radio>
          <Radio value="pencil">Pencil</Radio>
          <Radio value="eraser">Eraser</Radio>
        </RadioGroup>
        <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <Slider aria-label="Slider with custom handle" min={1} max={20} value={lineThickness} onChange={(value) => setLineThickness(value)}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <ButtonGroup>
          <Button onClick={clearCanvas}>Clear</Button>
          <Button onClick={saveImage}>Save</Button>
          <Button onClick={undo}>Undo</Button>
          <Button onClick={redo}>Redo</Button>
        </ButtonGroup>
        <Input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
      </Flex>
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
      </canvas>
    </Box>
  );
};

export default Design;
