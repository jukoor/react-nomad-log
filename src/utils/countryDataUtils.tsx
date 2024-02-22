/* Returns Emoji flag icon by country code */
export const getEmojiFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

/* Searches all countries data to return the specific country data by countryCode input */
export const getCountryData = (countryCode: string, allCountries: any[]) => {
  return allCountries?.find((country) => country.cca2 === countryCode);
};
