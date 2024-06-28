import { CountryCca2Type } from "../types/CountryCca2Type";
import { CountryType } from "../types/CountryType";

/* Returns Emoji flag icon by country code */
export const getEmojiFlag = (countryCode: CountryCca2Type) => {
  if (countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } else return "";
};

/* Searches all countries data to return the specific country data by countryCode input */
/* todo: allCountries any remove */
export const getCountryData = (
  countryCode: CountryCca2Type,
  countryData: CountryType[]
) => {
  return countryData?.find((country) => country.cca2 === countryCode);
};
