import React, { useRef } from "react";
import line from "../assets/images/ToolbarImages/line.svg";
import background_color from "../assets/images/ToolbarImages/background_color.svg";
import circle from "../assets/images/ToolbarImages/circle.svg";
import clear from "../assets/images/ToolbarImages/clear.svg";
import color_plate from "../assets/images/ToolbarImages/color_plate.svg";
import eraser from "../assets/images/ToolbarImages/eraser.svg";
import pencil from "../assets/images/ToolbarImages/pencil.svg";
import rectangle from "../assets/images/ToolbarImages/rectangle.svg";
import redoBtn from "../assets/images/ToolbarImages/redo.svg";
import undoBtn from "../assets/images/ToolbarImages/undo.svg";
import triangle from "../assets/images/ToolbarImages/triangle.svg";
import save from "../assets/images/ToolbarImages/save.svg";
import {
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Flex,
} from "@chakra-ui/react";

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
  const colorInputRef = useRef(null);
  const backgroundColorInputRef = useRef(null);
  const activeButtonStyle = { backgroundColor: '#718096' };
  const inactiveButtonStyle = {};

  return (
    <Flex
      position="fixed"
      top={10}
      zIndex={2}
      alignItems="center"
      justifyContent="center"
      width="100%"
      padding={5}
      flexWrap="wrap"
    >
        <ButtonGroup m={5} gap="1"  flexWrap="wrap">
          <Button
            id="line"
            style={tool === 'line' ? activeButtonStyle : inactiveButtonStyle}
            checked={tool === "line"}
            onClick={() => setTool("line")}
          >
            <Image src={line} alt="lineImg"></Image>
          </Button>
          <Button
            id="circle"
            style={tool === 'circle' ? activeButtonStyle : inactiveButtonStyle}
            checked={tool === "circle"}
            onClick={() => setTool("circle")}
          >
            <Image src={circle} alt="circuleImg" />
          </Button>
          <Button
            id="rectangle"
            style={tool === 'rectangle' ? activeButtonStyle : inactiveButtonStyle}
            checked={tool === "rectangle"}
            onClick={() => setTool("rectangle")}
          >
            <Image src={rectangle} alt="rectangleImg" />
          </Button>
          <Button
            id="triangle"
            style={tool === 'triangle' ? activeButtonStyle : inactiveButtonStyle}
            checked={tool === "triangle"}
            onClick={() => setTool("triangle")}
          >
            <Image src={triangle} alt="triangleImg" />
          </Button>
          <Button
            id="pencil"
            style={tool === 'pencil' ? activeButtonStyle : inactiveButtonStyle}
            checked={tool === "pencil"}
            onClick={() => setTool("pencil")}
          >
            <Image src={pencil} alt="pencilImg" />
          </Button>
          <Button
            id="eraser"
            style={tool === 'eraser' ? activeButtonStyle : inactiveButtonStyle}
            checked={tool === "eraser"}
            onClick={() => setTool("eraser")}
          >
            <Image src={eraser} alt="eraserImg" />
          </Button>
          <Box width="10rem">
            <Slider
              aria-label="slider-ex-2"
              min={0}
              max={20}
              value={lineThickness}
              onChange={(value) => setLineThickness(value)}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              colorScheme="pink"
              size="lg"
            >
              <SliderTrack bg="red.100">
                <SliderFilledTrack bg="tomato" />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Popover
            onOpen={() =>
              colorInputRef.current && colorInputRef.current.click()
            }
          >
            <PopoverTrigger>
              <Button>
                <Image src={color_plate} alt="colorPlateImg" />
              </Button>
            </PopoverTrigger>
            <PopoverContent maxWidth="5rem" marginLeft={4} marginRight={4}>
              <PopoverBody>
                <input
                  ref={colorInputRef}
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button onClick={clearCanvas}>
            <Image src={clear} alt="clearImg" />
          </Button>
          <Button onClick={saveImage}>
            <Image src={save} alt="saveImg" />
          </Button>
          <Button onClick={undo}>
            <Image src={undoBtn} alt="undoImg" />
          </Button>
          <Button onClick={redo}>
            <Image src={redoBtn} alt="redoImg" />
          </Button>
          <Popover
            onOpen={() =>
              backgroundColorInputRef.current &&
              backgroundColorInputRef.current.click()
            }
          >
            <PopoverTrigger>
              <Button>
                <Image src={background_color} alt="backgroundcolorImg" />
              </Button>
            </PopoverTrigger>
            <PopoverContent maxWidth="5rem">
              <PopoverBody>
                <input
                  ref={backgroundColorInputRef}
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </ButtonGroup>
    </Flex>
  );
};

export default Toolbar;
