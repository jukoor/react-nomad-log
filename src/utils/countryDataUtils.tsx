import { CountryCca2Type } from "../types/CountryCca2Type";

/* Returns Emoji flag icon by country code */
export const getEmojiFlag = (
  countryCode: CountryCca2Type | null | undefined
) => {
  if (countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } else return "";
};

/* Searches all countries data to return the specific country data by countryCode input */
export const getCountryData = (
  countryCode: CountryCca2Type,
  allCountries: any[]
) => {
  return allCountries?.find((country) => country.cca2 === countryCode);
};
