// Display first letter of first and last name as Avatar
export const getFirstLettersFromName = (name: string) => {
  return {
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
