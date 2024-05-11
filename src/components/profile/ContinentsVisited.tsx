import { Card, CardContent, Typography } from "@mui/material";

export const ContinentsVisited = () => {
  // const userData = useAppSelector((state) => state.User.selectedUser);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          gutterBottom
        >
          Continents visited
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
