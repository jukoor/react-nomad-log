// Return first letter of first and last name, empty string if name is empty
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// returns a prop object for the user avatar with their initials and a unique color for their name bg
export function randomColorStringAvatar(name: string) {
  if (!name || name.trim() === "") {
    // Default/Fallback styles
    return {
      sx: {
        bgcolor: "#bebebe", // Default color
      },
      children: "",
    };
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
