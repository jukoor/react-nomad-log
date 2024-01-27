import { Card, CardContent, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { UserDataContext } from "../../pages/Profile";
import { User } from "../../types/User";

export const CountriesVisited = () => {
  const userData = useContext(UserDataContext) as User;

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          gutterBottom
        >
          Countries visited
        </Typography>
        <Typography variant="h5" letterSpacing={20}>
          {userData && userData.countriesVisited}
        </Typography>
      </CardContent>
    </Card>
  );
};
