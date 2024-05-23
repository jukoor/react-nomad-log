import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import React from "react";
import { CustomTabPanel } from "./CustomTabPanel";
import { CountryList } from "./CountryList";

export const CountryLists = () => {
  const userData = useAppSelector((state) => state.User.selectedUser);
  const userDataLoading = useAppSelector((state) => state.User.loading);

  const [value, setValue] = useState(0);

  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      {userData && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {userDataLoading ? (
              <Skeleton
                variant="rounded"
                height={30}
                width={"200px"}
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography
                variant="h5"
                component="h2"
                color="text.secondary"
                gutterBottom
              >
                Country Lists
              </Typography>
            )}

            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                {userDataLoading ? (
                  <Skeleton variant="rounded" height={30} width={"100%"} />
                ) : (
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Lists of countries visited, bucket list countries and countries lived in."
                  >
                    <Tab label="Visited" {...a11yProps(0)} />
                    <Tab label="Bucket List" {...a11yProps(1)} />
                    <Tab label="Lived in" {...a11yProps(2)} />
                  </Tabs>
                )}
                <span></span>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <CountryList list={"countriesVisited"} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <CountryList list={"countriesBucketList"} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <CountryList list={"countriesLived"} />
              </CustomTabPanel>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};
