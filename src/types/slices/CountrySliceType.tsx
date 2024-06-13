import { CountryType } from "../CountryType";

export type CountrySliceType = {
  Country: CountrySliceInnerType;
};

export type CountrySliceInnerType = {
  countries: CountryType[];
  selectedCountry: CountryType | null;
  loading: boolean;
  apiError: boolean;
};
