import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { getCountryData } from "../../utils/countryDataUtils";
import { ContinentType, CountryType } from "../../types/CountryType";
import styles from "../../styles/ContinentsVisited.module.scss";
import { DonutChart } from "./DonutChart";

export const ContinentsVisited = () => {
  const [visitedContinents, setVisitedContinents] = useState<ContinentType[]>(
    []
  );

  const userData = useAppSelector((state) => state.User.selectedUser);
  const userDataLoading = useAppSelector((state) => state.User.loading);
  const countryData = useAppSelector((state) => state.Country.countries);
  const continentCount = 7;

  useEffect(() => {
    // Initialize an empty array to store country data for visited countries
    let visitedCountriesData: CountryType[] = [];

    // Fetch data for each country visited by the user
    userData?.countriesVisited?.forEach((countryCode) => {
      const countryDetails = getCountryData(countryCode, countryData);
      if (countryDetails) {
        visitedCountriesData.push(countryDetails);
      }
    });

    const continentsOrg = visitedCountriesData.map(
      (country) => country.continents
    );
    // Extract continents from the visited countries data
    const continents = [...new Set(continentsOrg.flat())];
    const continentsArray = Array.from(continents);
    // Update the state with the continents visited, use flat() to resolve the second array created by array.from
    setVisitedContinents(continentsArray);
  }, [userData, countryData]);

  const continentsVisitedPercent =
    (visitedContinents.length / continentCount) * 100;

  // All available continents
  const continents: ContinentType[] = [
    "Africa",
    "Antarctica",
    "Asia",
    "Europe",
    "North America",
    "Oceania",
    "South America",
  ];

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
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Continents visited
            </Typography>

            <Box>
              <DonutChart
                id={1}
                percent={Number(continentsVisitedPercent)}
                text={`${Math.round(continentsVisitedPercent)}%`}
              />
            </Box>
          </Box>
        )}

        <Box sx={{ width: "100%", pb: 0 }}>
          {userDataLoading ? (
            <>
              <Box className={styles.continents}>
                <Skeleton variant="rounded" height={125} />
                <Skeleton variant="rounded" height={125} />
                <Skeleton variant="rounded" height={125} />
                <Skeleton variant="rounded" height={125} />
                <Skeleton variant="rounded" height={125} />
                <Skeleton variant="rounded" height={125} />
                <Skeleton variant="rounded" height={125} />
              </Box>
            </>
          ) : (
            <div className={styles.continents}>
              {continents.map((item: ContinentType) => {
                const continentNoSpaces = item.replace(" ", "").toLowerCase();
                const isContinentVisited = visitedContinents.includes(
                  item
                ) as boolean;

                return (
                  <div
                    className={`${styles.continent} ${
                      styles[continentNoSpaces]
                    } ${isContinentVisited ? styles.active : ""}`}
                    key={item}
                  >
                    <div
                      className={`${styles.svg} ${styles[continentNoSpaces]}`}
                    ></div>
                    <div className={styles.name}>{item}</div>
                  </div>
                );
              })}
            </div>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
