import { CountryCca2Type } from "./CountryCca2Type";

export type UserType = {
  uid?: string;
  nameFirst: string;
  nameLast: string;
  bio?: string;
  tags?: string[];
  livingInCity: string;
  homeCountry: CountryCca2Type[];
  countriesVisited?: CountryCca2Type[];
  countriesBucketList?: CountryCca2Type[];
  countriesLived?: CountryCca2Type[];
};
