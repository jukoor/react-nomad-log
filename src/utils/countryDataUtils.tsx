import { useAppSelector } from "../hooks/hooks";

const allCountries = useAppSelector((state) => state.Country.countries);

export const useAllCountries = () => {
  return useAppSelector((state) => state.Country.countries);
};

/* Returns Emoji flag icon by country code */
export const getEmojiFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

/* Searches all countries data to return the specific country data by countryCode input */
export const getCountryData = (countryCode: string) => {
  return allCountries?.find((country) => country.cca2 === countryCode);
};
