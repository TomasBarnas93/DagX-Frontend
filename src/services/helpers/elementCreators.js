import rough from 'roughjs';

const generator = rough.generator();

export const createElement = (id, x1, y1, x2, y2, type, color, thickness) => {
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

export const updateElement = (id, x1, y1, x2, y2, type, options, elements, setElements, lineThickness) => {
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