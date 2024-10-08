import {
  List,
  Skeleton,
  ListItem,
  ButtonGroup,
  IconButton,
  Pagination,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useRemoveCountryFromList } from "../../hooks/useRemoveCountryFromList";
import { toggleCountryDetailsOverlay } from "../../store/appSlice";
import { setSelectedCountry } from "../../store/countrySlice";
import { setSelectedUser } from "../../store/userSlice";
import { CountryCca2Type } from "../../types/CountryCca2Type";
import { getCountryData, getEmojiFlag } from "../../utils/countryDataUtils";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import styles from "../../styles/CountryList.module.scss";

interface CountryListProps {
  list: "countriesVisited" | "countriesLived" | "countriesBucketList";
}

export const CountryList = ({ list }: CountryListProps) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const { updateCountryList } = useRemoveCountryFromList();

  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.User.selectedUser);
  const countries = useAppSelector((state) => state.Country.countries);
  const userDataLoading = useAppSelector((state) => state.User.loading);

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
  const handleRemoveCountry = async (countryToRemove: CountryCca2Type) => {
    try {
      // Remove country from list of countries
      const filteredCountries = countryList?.filter(
        (country: CountryCca2Type) => country !== countryToRemove
      );

      // Update Firebase Store with new values
      if (filteredCountries) {
        await updateCountryList(list, filteredCountries as CountryCca2Type[]);

        // Set new list of countries to store, exlucding the selected country
        dispatch(
          setSelectedUser({
            ...userData,
            [list]: filteredCountries,
          })
        );
      }
    } catch (err) {
      console.error("Failed to remove country:", err);
    }
  };

  return (
    <List className={styles.orderedList}>
      {paginatedCountryList.map((item: CountryCca2Type, index: number) => {
        let singleCountry = getCountryData(item, countries);
        if (singleCountry) {
          return (
            <React.Fragment key={index}>
              {userDataLoading ? (
                <Skeleton
                  variant="rounded"
                  height={30}
                  width={"100%"}
                  sx={{ mb: "15px" }}
                />
              ) : (
                <ListItem
                  data-index={index + 10 * (currentPage - 1) + 1}
                  key={`${item}_${index}`}
                  className={styles.listItem}
                  secondaryAction={
                    <ButtonGroup size="small" aria-label="Small button group">
                      <Tooltip
                        title={"Show country details"}
                        placement="top"
                        arrow
                      >
                        <IconButton
                          sx={{ marginRight: "5px" }}
                          className={styles.iconBtn}
                          onClick={() => {
                            dispatch(
                              setSelectedCountry(
                                getCountryData(item, countries)
                              )
                            );
                            dispatch(toggleCountryDetailsOverlay());
                          }}
                        >
                          <InfoOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        sx={{ marginRight: "5px" }}
                        title={"Remove country from list"}
                        placement="top"
                        arrow
                      >
                        <IconButton
                          className={styles.iconBtn}
                          sx={{
                            ":hover": {
                              color: "#cb0000",
                            },
                          }}
                          onClick={() =>
                            handleRemoveCountry(
                              singleCountry.cca2 as CountryCca2Type
                            )
                          }
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  }
                >
                  <span className={styles.flag}>{getEmojiFlag(item)}</span>
                  <span className={styles.title}>
                    {singleCountry?.name.common}
                  </span>
                </ListItem>
              )}
            </React.Fragment>
          );
        }
      })}
      {!userDataLoading && (
        <div className={styles.pagesAndCount}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
      )}
    </List>
  );
};
