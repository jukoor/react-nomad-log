import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";

import styles from "../../styles/ToggleCountryPopup.module.scss";
import { useAppSelector } from "../../hooks/reduxHooks";
import { CountryCca2Type } from "../../types/CountryCca2Type";
import ChecklistIcon from "@mui/icons-material/Checklist";
import {
  CountryList,
  useToggleCountryInList,
} from "../../hooks/useToggleCountryInList";

export const ToggleCountryPopup = () => {
  const userData = useAppSelector((state) => state.User);
  const selectedUserdata = useAppSelector((state) => state.User.selectedUser);
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [countryList, setCountryList] = useState({
    countriesVisited:
      (selectedUserdata.countriesVisited?.includes(
        selectedCountry?.cca2 as CountryCca2Type
      ) ||
        selectedCountry?.cca2 === userData.countryVisitedTemp) ??
      false,
    countriesBucketList:
      (selectedUserdata.countriesBucketList?.includes(
        selectedCountry?.cca2 as CountryCca2Type
      ) ||
        selectedCountry?.cca2 === userData.countryBucketListTemp) ??
      false,
    countriesLived:
      (selectedUserdata.countriesLived?.includes(
        selectedCountry?.cca2 as CountryCca2Type
      ) ||
        selectedCountry?.cca2 === userData.countryLivedTemp) ??
      false,
  });
  const { toggleCountryInList } = useToggleCountryInList();

  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;

  const handleOpenPopup = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchor(anchor ? null : event.currentTarget);
    },
    [anchor]
  );

  useEffect(() => {
    console.log(anchor);
  }, [anchor]);

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setCountryList((prevCountryList) => ({
      ...prevCountryList,
      [name]: checked,
    }));

    // Determine action based on the switch's value
    const action = checked ? "add" : "remove";

    // Call toggleCountryInList with the appropriate parameters
    toggleCountryInList(action, name as CountryList);
  };

  return (
    <>
      <Button
        aria-describedby={id}
        type="button"
        variant="contained"
        onClick={handleOpenPopup}
        startIcon={<ChecklistIcon />}
      >
        Set On List
      </Button>
      <BasePopup
        id={id}
        open={open}
        anchor={anchor}
        className={styles.switchPopup}
      >
        <div>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={countryList.countriesVisited}
                    onChange={handleChangeSwitch}
                    name="countriesVisited"
                  />
                }
                label="Visited"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={countryList.countriesBucketList}
                    onChange={handleChangeSwitch}
                    name="countriesBucketList"
                  />
                }
                label="Bucket List"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={countryList.countriesLived}
                    onChange={handleChangeSwitch}
                    name="countriesLived"
                  />
                }
                label="Lived In"
              />
            </FormGroup>
            <FormHelperText>Check 1 or more</FormHelperText>
          </FormControl>
        </div>
      </BasePopup>
    </>
  );
};
