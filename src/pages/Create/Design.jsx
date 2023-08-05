import React, { useRef, useState } from "react";
import { Button, Container } from "@chakra-ui/react";

function Design() {
  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);

  const startPainting = () => {
    setIsPainting(true);
  };

  const stopPainting = () => {
    setIsPainting(false);
  };

  const handlePainting = (e) => {
    if (!isPainting) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
  };

  return (
    <Container>
      <canvas
        ref={canvasRef}
        width={600}
        height={500}
        style={{ border: "1px solid black" }}
        onMouseDown={startPainting}
        onMouseUp={stopPainting}
        onMouseMove={handlePainting}
        onMouseLeave={stopPainting}
      />
      <Button m={2} colorScheme="green" onClick={saveCanvas}>
        Save
      </Button>
      <Button m={2} colorScheme="blue" onClick={clearCanvas}>
        Clear
      </Button>
    </Container>
  );
}

export default Design;
