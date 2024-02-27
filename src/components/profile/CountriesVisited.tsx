import { Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { UserDataContext } from "../../pages/Profile";
import { UserType } from "../../types/UserType";
import { getEmojiFlag } from "../../utils/countryDataUtils";

export const CountriesVisited = () => {
  const userData = useContext(UserDataContext) as UserType;

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
          {userData?.countriesVisited.map((item: any, index: any) => {
            return <span key={index}>{getEmojiFlag(item)}</span>;
          })}
        </Typography>
      </CardContent>
    </Card>
  );
};
