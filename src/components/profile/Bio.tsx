import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Box,
  Divider,
  Skeleton,
} from "@mui/material";

import styles from "../../styles/Bio.module.scss";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getEmojiFlag } from "../../utils/countryDataUtils";
import { HighlightNumbers } from "./HighlightNumbers";

export const Bio = () => {
  const userData = useAppSelector((state) => state.User.selectedUser);
  const userDataLoading = useAppSelector((state) => state.User.loading);

  {
    /* Render sceleton during data loading */
  }
  const renderContent = () => {
    switch (userDataLoading) {
      case true:
        return (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "25px",
              }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rounded" height={35} width={"50%"} />
            </Box>

            <Skeleton variant="text" width={"30%"} sx={{ mb: 1.5 }} />
            <Skeleton variant="text" width={"50px"} sx={{ mb: 1.5 }} />
            <Skeleton variant="rounded" width={"100%"} height={180} />
          </>
        );
      case false:
        return (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "25px",
              }}
            >
              {userData?.homeCountry && (
                <Avatar sx={{ backgroundColor: "#cfcfcf" }}>
                  {getEmojiFlag(userData?.homeCountry[0])}
                </Avatar>
              )}

              <Typography
                variant="h5"
                component="h1"
                color="text.secondary"
                sx={{ color: "#212121" }}
                className={styles.name}
              >
                {userData?.nameFirst} {userData?.nameLast}
              </Typography>

              <HighlightNumbers />
            </Box>

            <div className={styles.tags}>
              {userData?.tags?.map((item: string, index: number) => (
                <Chip
                  className={styles.tag}
                  key={index}
                  label={item}
                  variant="outlined"
                  size="small"
                  color="primary"
                  sx={{ mb: 1.5 }}
                />
              ))}
            </div>

            <Typography
              variant="button"
              display="block"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Currently Living
            </Typography>

            <Divider sx={{ mb: "10px" }} />

            <Typography variant="body2" sx={{ mb: 3 }}>
              {userData?.livingInCity}
            </Typography>

            <Typography
              variant="button"
              display="block"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              BIO
            </Typography>

            <Divider sx={{ mb: "10px" }} />

            <Typography variant="body2" className={styles.bio}>
              {userData?.bio}
            </Typography>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        boxShadow: "0px 0px 20px 11px #00000012",
        borderRadius: "25px",
        backgroundColor: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(5px)",
      }}
    >
      <CardContent sx={{ padding: { xs: "20px", sm: "20px", md: "30px" } }}>
        {renderContent()}
      </CardContent>
    </Card>
  );
};
