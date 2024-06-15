import { Box, Card, CardContent, Skeleton, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useMemo } from "react";
import { getCountryData } from "../../utils/countryDataUtils";
import { ContinentType } from "../../types/CountryType";
import styles from "../../styles/ContinentsVisited.module.scss";

export const ContinentsVisited = () => {
  const userData = useAppSelector((state) => state.User.selectedUser);
  const userDataLoading = useAppSelector((state) => state.User.loading);
  const countryData = useAppSelector((state) => state.Country.countries);

  // Get list of visited continents from list of visited countries
  const visitedContinents: string[] = useMemo(() => {
    if (!userData || !Array.isArray(userData.countriesVisited)) return [];
    const allContinents = [].concat(
      ...userData.countriesVisited.map(
        (country) => getCountryData(country, countryData).continents
      )
    );
    return Array.from(new Set(allContinents)).sort();
  }, [userData]);

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
      <CardContent sx={{ padding: { xs: "20px", sm: "20px", md: "30px" } }}>
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
            sx={{ mb: 4 }}
          >
            Continents visited
          </Typography>
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
              {continents.map((item: string) => {
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
