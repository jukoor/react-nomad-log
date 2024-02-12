import { CountryType } from "../types/CountryType";

/* Returns Emoji flag icon by country code */
export const getEmojiFlagFromCc = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

/* Searches all countries data to return the specific country data by countryCode input */
export const findCountryByCode = (
  countryCode: string,
  countryData: CountryType[]
) => {
  return countryData.find((country) => country.cca2 === countryCode);
};
