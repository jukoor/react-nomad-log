import { CountryList } from "./CountryList";

export type CountryActionTemp = {
  action: "add" | "remove";
  countryList: CountryList;
};
