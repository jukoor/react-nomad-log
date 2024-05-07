// Return first letter of first and last name, empty string if name is empty
export const getFirstLettersFromName = (name: string) => {
  if (name.trim() === "") {
    return "";
  }
  const nameParts = name.split(" ");
  let initials = nameParts[0][0];
  if (nameParts.length > 1 && nameParts[1].trim() !== "") {
    initials += nameParts[1][0];
  }
  return initials;
};
