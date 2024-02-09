import { CountryShortType } from "../CountryShortType";
import { CountryType } from "../CountryType";

export type CountrySliceType = {
  Country: CountrySliceInnerType;
};

export type CountrySliceInnerType = {
  countries: CountryType[];
  selectedCountry: CountryShortType | null;
  loading: boolean;
};
