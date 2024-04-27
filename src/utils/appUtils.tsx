// Return first letter of first and last name, empty string if name is empty
export const getFirstLettersFromName = (name: string) => {
  if (name.trim() === "") {
    return {
      children: "",
    };
  }
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
