import { Card, CardContent, List, ListItem, Typography } from "@mui/material";

export const Trips = () => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          gutterBottom
        >
          Trips
        </Typography>
        <List>
          <ListItem>Deutschland</ListItem>
          <ListItem>Deutschland</ListItem>
          <ListItem>Deutschland</ListItem>
          <ListItem>Deutschland</ListItem>
          <ListItem>Deutschland</ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
