export type UserType = {
  uid: string;
  nameFirst: string;
  nameLast?: string;
  bio?: string;
  tags?: string[];
  homeTown?: string;
  nationality: string;
  countriesVisited?: string[];
  countriesBucketList?: string[];
  countriesLived?: string[];
};
