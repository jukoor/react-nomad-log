import {
  Box,
  ButtonGroup,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  Pagination,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styles from "../../styles/BucketList.module.scss";
import { getCountryData, getEmojiFlag } from "../../utils/countryDataUtils";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { setSelectedCountry } from "../../store/countrySlice";
import { toggleCountryDetailsOverlay } from "../../store/appSlice";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React from "react";
import { useRemoveCountryFromList } from "../../hooks/useRemoveCountryFromList";
import { CountryCca2Type } from "../../types/CountryCca2Type";
import { setSelectedUser } from "../../store/userSlice";

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

export const CountryLists = () => {
  const countries = useAppSelector((state) => state.Country.countries);
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.User.selectedUser);
  const userDataLoading = useAppSelector((state) => state.User.loading);

  const [value, setValue] = useState(0);

  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // console.log(newValue);
  };

  // ToDo: Put in own Component
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  interface CountryListProps {
    list: "countriesVisited" | "countriesLived" | "countriesBucketList";
  }

  // ToDo: Extract to own component
  const CountryList = ({ list }: CountryListProps) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const { updateCountryList } = useRemoveCountryFromList();

    const countryList = userData?.[list] ?? [];

    const handleChangePage = (
      // @ts-ignore
      event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      setCurrentPage(value);
    };

    const totalPages = Math.ceil(countryList.length / itemsPerPage);
    const paginatedCountryList = countryList?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    // Remove country from one of the 3 lists from firebase and redux store
    const handleRemoveCountry = async (country: CountryCca2Type) => {
      try {
        // Remove country from list of countries
        const filteredCountriesVisited = userData.countriesVisited?.filter(
          (country2) => country2 !== country
        );

        // Update Firebase Store with new values
        if (filteredCountriesVisited) {
          await updateCountryList(
            list,
            filteredCountriesVisited as CountryCca2Type[]
          );

          // Set new list of countries to store, exluciding the selected country
          dispatch(
            setSelectedUser({
              ...userData,
              countriesVisited: filteredCountriesVisited,
            })
          );
        }
      } catch (err) {
        console.error("Failed to remove country:", err);
      }
    };

    return (
      <List className={styles.orderedList}>
        {paginatedCountryList.map((item: any, index: any) => {
          let singleCountry = getCountryData(item, countries);
          return (
            <React.Fragment key={index}>
              {userDataLoading ? (
                <Skeleton
                  variant="rounded"
                  height={30}
                  width={"100%"}
                  sx={{ mb: 0.5 }}
                />
              ) : (
                <ListItem
                  data-index={index}
                  key={`${item}_${index}`}
                  className={styles.listItem}
                  secondaryAction={
                    <ButtonGroup size="small" aria-label="Small button group">
                      <IconButton
                        sx={{ marginRight: "5px" }}
                        onClick={() => {
                          dispatch(
                            setSelectedCountry(getCountryData(item, countries))
                          );
                          dispatch(toggleCountryDetailsOverlay());
                        }}
                      >
                        <InfoOutlinedIcon />
                      </IconButton>
                      <IconButton
                        sx={{ marginRight: "5px" }}
                        onClick={() => handleRemoveCountry(singleCountry.cca2)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </ButtonGroup>
                  }
                >
                  <span className={styles.flag}>{getEmojiFlag(item)}</span>
                  {singleCountry?.name.common}
                </ListItem>
              )}
            </React.Fragment>
          );
        })}
        {!userDataLoading && (
          <>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Total Countries: {paginatedCountryList.length}
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              sx={{ marginTop: 2 }}
            />
          </>
        )}
      </List>
    );
  };

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
