import { Card, CardContent, Typography } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { UserDataContext } from "../../pages/Profile";
import { UserType } from "../../types/UserType";
import { getCountryData } from "../../utils/countryDataUtils";

export const ContinentsVisited = () => {
  const userData = useContext(UserDataContext) as UserType;
  const countriesVisited = userData?.countriesVisited;

  // const uniqueContinents = () => {
  //   const allContinents = userData?.countriesVisited.flatMap((countryCode) => {
  //     const countryData = getCountryData(countryCode);
  //     return countryData?.continents || [];
  //   });

  //   return [...new Set(allContinents)]; // Create a Set to remove duplicates and convert back to an array
  // };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          gutterBottom
        >
          Bucket List
        </Typography>
        <Typography variant="h5" letterSpacing={20}>
          {/* {uniqueContinents().map((continent) => (
            <Typography key={continent}>{continent}</Typography>
          ))} */}
        </Typography>
      </CardContent>
    </Card>
  );
};
