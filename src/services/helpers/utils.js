export const getEventCoordinates = (event, panOffset = { x: 0, y: 0 }) => {
  const touchEvent = event.changedTouches ? event.changedTouches[0] : null;
  const targetEvent = touchEvent || event;
  if (!targetEvent || !targetEvent.target) {
      return { clientX: 0, clientY: 0 };
  }
  const { clientX, clientY } = targetEvent;
  const rect = targetEvent.target.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  return { clientX: x - panOffset.x, clientY: y - panOffset.y };
};

export const resizedCoordinates = (clientX, clientY, position, coordinates) => {
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