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
import { randomColorStringAvatar } from "../../utils/appUtils";
import { useAppSelector } from "../../hooks/reduxHooks";
import React from "react";

export const Bio = () => {
  const userData = useAppSelector((state) => state.User.selectedUser);
  const userDataLoading = useAppSelector((state) => state.User.loading);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          {userDataLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar
              {...randomColorStringAvatar(
                `${userData.nameFirst} ${userData.nameLast}`
              )}
            ></Avatar>
          )}

          {userDataLoading ? (
            <Skeleton variant="rounded" height={35} width={"50%"} />
          ) : (
            <Typography
              variant="h5"
              component="h1"
              color="text.secondary"
              className={styles.name}
            >
              {userData?.nameFirst} {userData?.nameLast}
            </Typography>
          )}
        </Box>

        {userDataLoading ? (
          <Skeleton variant="text" width={"30%"} />
        ) : (
          <Typography color="text.secondary" className={styles.nationality}>
            Nationality: {userData?.nationality}
          </Typography>
        )}

        {userDataLoading ? (
          <Skeleton variant="text" width={"30%"} sx={{ mb: 1.5 }} />
        ) : (
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            className={styles.nationality}
          >
            Living in: {userData?.homeTown}
          </Typography>
        )}

        <div className={styles.tags}>
          {userData?.tags?.map((item: string, index: number) => {
            return (
              <React.Fragment key={index}>
                {userDataLoading ? (
                  <Skeleton
                    key={index}
                    variant="text"
                    height={32}
                    width={"100px"}
                    sx={{ mr: 0.5 }}
                  />
                ) : (
                  <Chip
                    className={styles.tag}
                    key={index}
                    label={item}
                    variant="outlined"
                    color="primary"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {userDataLoading ? (
          <Skeleton variant="text" width={"50px"} sx={{ mb: 1.5 }} />
        ) : (
          <Typography variant="button" display="block" gutterBottom>
            BIO
          </Typography>
        )}

        <Divider sx={{ mb: "10px" }} />
        {userDataLoading ? (
          <Skeleton variant="rounded" width={"100%"} height={180} />
        ) : (
          <Typography variant="body2" className={styles.bio}>
            {userData?.bio}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
