import { Card, CardContent, Typography } from "@mui/material";

export const ContinentsVisited = () => {
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
        <div>
          <div>Afrika</div>
        </div>
        <Typography variant="h5" letterSpacing={20}>
          🇮🇹🇬🇧🇯🇵🇦🇺🇮🇸🇮🇳🇳🇿🇧🇷🇩🇪🇮🇹🇬🇧🇯🇵🇦🇺🇮🇸🇮🇳🇳🇿🇧🇷
        </Typography>
      </CardContent>
    </Card>
  );
};
