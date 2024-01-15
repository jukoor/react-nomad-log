import { Card, CardContent, Typography } from "@mui/material";

export const CountriesVisited = () => {
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
          🇮🇹🇬🇧🇯🇵🇦🇺🇮🇸🇮🇳🇳🇿🇧🇷🇩🇪🇮🇹🇬🇧🇯🇵🇦🇺🇮🇸🇮🇳🇳🇿🇧🇷
        </Typography>
      </CardContent>
    </Card>
  );
};
