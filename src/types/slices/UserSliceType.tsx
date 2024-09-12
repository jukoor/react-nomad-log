import { CountryActionTemp } from "../CountryActionTemp";
import { UserType } from "../UserType";

export type UserSliceType = {
  selectedUser: UserType | null;
  visitedCountryTemp: CountryActionTemp | null;
  bucketListCountryTemp: CountryActionTemp | null;
  livedCountryTemp: CountryActionTemp | null;
  loading: boolean;
};
