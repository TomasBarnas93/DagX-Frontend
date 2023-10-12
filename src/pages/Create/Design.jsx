import React, { useState, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";
import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
} from "@chakra-ui/react";
import "./Design.css";
import { Container } from "semantic-ui-react";
import brushImage from "../../assets/images/Paint-brush.jpg";
import eraserImage from "../../assets/images/Pink-eraser.svg.png";
import backgroundIcon from "../../assets/images/backgorundIcon.png";

function Design() {
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [pencilSize, setPencilSize] = useState(5);
  const [eraserMode, setEraserMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [shape, setShape] = useState(null);
  const [startPoint, setStartPoint] = useState(null);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const hiddenCanvas = hiddenCanvasRef.current;

      const canvasWidth =
        window.innerWidth < 768
          ? window.innerWidth * 0.9
          : window.innerWidth * 0.8;
      const canvasHeight =
        window.innerWidth < 768
          ? window.innerWidth * 0.6
          : window.innerWidth * 0.3;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      hiddenCanvas.width = window.innerWidth * 0.6;
      hiddenCanvas.height = window.innerWidth * 0.3;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;

    if (shape) {
        setStartPoint({ x: offsetX, y: offsetY });
    } else {
        context.strokeStyle = eraserMode ? "#FFFFFF" : color;
        context.lineWidth = eraserMode ? pencilSize * 2 : pencilSize;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(offsetX, offsetY);
    }

    setIsDrawing(true);
};

const draw = (e) => {
  if (!isDrawing || shape) return;

  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  const { offsetX, offsetY } = e.nativeEvent;

  context.lineTo(offsetX, offsetY);
  context.stroke();
};

  const endDrawing = (e) => {
    if (shape && startPoint) {
        const { offsetX, offsetY } = e.nativeEvent;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = pencilSize;
        if (shape === 'line') {
            context.moveTo(startPoint.x, startPoint.y);
            context.lineTo(offsetX, offsetY);
        } else if (shape === 'circle') {
            const radius = Math.sqrt((startPoint.x - offsetX)**2 + (startPoint.y - offsetY)**2);
            context.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2);
        } else if (shape === 'triangle') {
            context.moveTo(startPoint.x, startPoint.y);
            context.lineTo(offsetX, offsetY);
            context.lineTo(startPoint.x, offsetY);
            context.closePath();
        }
        context.stroke();
    }
    setStartPoint(null);
    setIsDrawing(false);
    setShape(null);
};

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    const context = hiddenCanvas.getContext("2d");

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, hiddenCanvas.width, hiddenCanvas.height);

    context.drawImage(canvas, 0, 0);

    const image = hiddenCanvas.toDataURL("image/png");

    if (window.navigator.msSaveBlob) {
      const blob = dataURItoBlob(image);
      window.navigator.msSaveBlob(blob, "my_drawing.png");
    } else {
      const link = document.createElement("a");
      link.href = image;
      link.download = "my_drawing.png";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: mimeString });
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const toggleEraserMode = () => {
    setEraserMode((prevEraserMode) => !prevEraserMode);
  };

  const changeBackgroundColor = (newColor) => {
    setBackgroundColor(newColor.hex);
  };

  useEffect(() => {
    const applyBackgroundColor = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    applyBackgroundColor();
  }, [backgroundColor]);

  return (
    <Container>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        boxShadow="lg"
      >
        <Box className="toolbar" m={5}>
          <ChromePicker
            color={color}
            onChange={handleColorChange}
            disableAlpha={true}
          />
          <input
            type="range"
            min="1"
            max="20"
            value={pencilSize}
            onChange={(e) => setPencilSize(parseInt(e.target.value))}
            className="range-input"
          />
          <Box m={3}>
            <Button onClick={() => setShape("line")}>Line</Button>
            <Button onClick={() => setShape("circle")}>Circle</Button>
            <Button onClick={() => setShape("triangle")}>Triangle</Button>
          </Box>
          <Flex>
            <Box m={2}>
              <img
                src={brushImage}
                alt="Brush"
                onClick={() => setEraserMode(false)}
                className={`tool-icon ${!eraserMode ? "active-tool" : ""}`}
              />
            </Box>
            <Box m={2}>
              <img
                src={eraserImage}
                alt="Eraser"
                onClick={() => toggleEraserMode()}
                className={`tool-icon ${eraserMode ? "active-tool" : ""}`}
              />
            </Box>
            <Popover>
              <PopoverTrigger>
                <Button backgroundColor="white" pt={5}>
                  <Image src={backgroundIcon}></Image>
                </Button>
              </PopoverTrigger>
              <PopoverContent paddingLeft={5} pt={5}>
                <ChromePicker
                  color={backgroundColor}
                  onChange={changeBackgroundColor}
                  disableAlpha={true}
                />
              </PopoverContent>
            </Popover>
          </Flex>
        </Box>
        <Box>
          <canvas
            ref={canvasRef}
            className="drawing-canvas"
            onTouchStart={(e) => startDrawing(e.touches[0])}
            onTouchMove={(e) => draw(e.touches[0])}
            onTouchEnd={endDrawing}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
          />
        </Box>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Box>
          <Button
            className="save-button"
            colorScheme="whatsapp"
            onClick={saveCanvas}
          >
            Save
          </Button>
        </Box>
        <Box>
          <Button
            className="reset-button"
            colorScheme="red"
            onClick={resetCanvas}
          >
            Reset
          </Button>
        </Box>
      </Flex>
      <canvas ref={hiddenCanvasRef} className="hidden-canvas" />
    </Container>
  );
}

export default Design;
