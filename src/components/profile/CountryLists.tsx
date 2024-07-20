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
  const userDataLoading = useAppSelector((state) => state.User.loading);
  const userData = useAppSelector((state) => state.User.selectedUser);

  const [activeTabIdx, setActiveTabIdx] = useState(0);

  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIdx(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function tabLabel(label: string, length: number) {
    let countryStringSingular = "Country";
    let countryStringPlural = "Countries";

    return (
      <>
        <span style={{ fontWeight: "bold" }}>{label}</span>
        <span style={{ fontSize: "10px" }}>
          {length} {length === 1 ? countryStringSingular : countryStringPlural}
        </span>
      </>
    );
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          boxShadow: "0px 0px 20px 11px #00000012",
          borderRadius: "25px",
          backgroundColor: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(5px)",
        }}
      >
        <CardContent
          sx={{
            padding: {
              xs: "20px",
              sm: "15px 20px 20px 20px",
              md: "20px 30px 30px 30px",
            },
          }}
        >
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
              sx={{ mb: 2 }}
            >
              Country Lists
            </Typography>
          )}

          <Box sx={{ width: "100%", pb: 0 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 0 }}>
              {userDataLoading ? (
                <Skeleton variant="rounded" height={30} width={"100%"} />
              ) : (
                <Tabs
                  value={activeTabIdx}
                  scrollButtons={true}
                  allowScrollButtonsMobile
                  onChange={handleChange}
                  aria-label="Lists of countries visited, bucket list countries and countries lived in."
                >
                  <Tab
                    label={tabLabel(
                      "Visited",
                      Number(userData?.countriesVisited?.length)
                    )}
                    {...a11yProps(0)}
                  />

                  <Tab
                    label={tabLabel(
                      "Bucket List",
                      Number(userData?.countriesBucketList?.length)
                    )}
                    {...a11yProps(0)}
                  />

                  <Tab
                    label={tabLabel(
                      "Lived",
                      Number(userData?.countriesLived?.length)
                    )}
                    {...a11yProps(0)}
                  />
                </Tabs>
              )}
              <span></span>
            </Box>

            <CustomTabPanel value={activeTabIdx} index={0}>
              <CountryList list={"countriesVisited"} />
            </CustomTabPanel>
            <CustomTabPanel value={activeTabIdx} index={1}>
              <CountryList list={"countriesBucketList"} />
            </CustomTabPanel>
            <CustomTabPanel value={activeTabIdx} index={2}>
              <CountryList list={"countriesLived"} />
            </CustomTabPanel>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
