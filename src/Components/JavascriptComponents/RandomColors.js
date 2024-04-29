export const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue value (0-359)
    const saturation = Math.floor(Math.random() * 20) + 80; // Random saturation value (80-100)
    const lightness = Math.floor(Math.random() * 40) + 60; // Random lightness value (60-100)
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Construct HSL color string
  };