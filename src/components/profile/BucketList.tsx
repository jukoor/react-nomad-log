import { Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { UserDataContext } from "../../pages/Profile";
import { UserType } from "../../types/UserType";
import { getEmojiFlag } from "../../utils/countryDataUtils";

export const BucketList = () => {
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
          Bucket List
        </Typography>
        <Typography variant="h5" letterSpacing={20}>
          {userData?.bucketList.map((item: any, index: any) => {
            return <span key={index}>{getEmojiFlag(item)}</span>;
          })}
        </Typography>
      </CardContent>
    </Card>
  );
};
