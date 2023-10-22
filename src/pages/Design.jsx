import React, {useEffect} from "react";
import Toolbar from '../components/Toolbar';
import Canvas from '../components/Canvas';
import { useHistory} from '../services/hooks/useHistory';
import {useCanvasDraw} from '../services/hooks/useCanvasDraw'; 
import { usePressedKeys } from '../services/hooks/usePressedKeys';

const Design = () => {
    const [elements, setElements, undo, redo] = useHistory([]);
    const pressedKeys = usePressedKeys();
    const {
        tool,
        color,
        lineThickness,
        backgroundColor,
        handleStart,
        handleMove,
        handleEnd,
        clearCanvas,
        saveImage,
        setTool,
        setColor,
        setLineThickness,
        setBackgroundColor,
    } = useCanvasDraw(elements, setElements, pressedKeys);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    
    return (
        
        <div style={{ overscrollBehavior: "none"}} >
            <Toolbar
                tool={tool}
                setTool={setTool}
                color={color}
                setColor={setColor}
                lineThickness={lineThickness}
                setLineThickness={setLineThickness}
                clearCanvas={clearCanvas}
                saveImage={saveImage}
                undo={undo}
                redo={redo}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
            />
            <Canvas
                handleStart={handleStart}
                handleMove={handleMove}
                handleEnd={handleEnd}
            />
        </div>
    );
};

export default Design;