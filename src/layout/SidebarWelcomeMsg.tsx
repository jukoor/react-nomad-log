import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../hooks/reduxHooks";

export const SidebarWelcomeMsg = () => {
  const user = useAppSelector((state) => state.User.selectedUser);

  const currentHour = new Date().getHours();
  const welcomeText =
    currentHour >= 22 || currentHour < 6
      ? "Good Night"
      : currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <Box sx={{ padding: "20px", color: "white" }}>
      <Typography variant="subtitle2" gutterBottom>
        {welcomeText}
        <span style={{ display: "inline-block", marginLeft: "5px" }}>👋</span>
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {user?.nameFirst} {user?.nameLast}
      </Typography>
    </Box>
  );
};
