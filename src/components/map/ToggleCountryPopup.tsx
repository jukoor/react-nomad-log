import {
  Button,
  Divider,
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { useCallback, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useAppSelector } from "../../hooks/reduxHooks";
import { CountryCca2Type } from "../../types/CountryCca2Type";
import {
  CountryList,
  useToggleCountryInList,
} from "../../hooks/useToggleCountryInList";
import styles from "../../styles/CountryActionButtons.module.scss";

export const ToggleCountryPopup = () => {
  const selectedUserdata = useAppSelector((state) => state.User.selectedUser);
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [countryList, setCountryList] = useState({
    countriesVisited: selectedUserdata?.countriesVisited?.includes(
      selectedCountry?.cca2 as CountryCca2Type
    ),
    countriesBucketList: selectedUserdata?.countriesBucketList?.includes(
      selectedCountry?.cca2 as CountryCca2Type
    ),
    countriesLived: selectedUserdata?.countriesLived?.includes(
      selectedCountry?.cca2 as CountryCca2Type
    ),
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

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Button
        className={styles.actionBtn}
        aria-describedby={id}
        type="button"
        onClick={handleOpenPopup}
        startIcon={<CheckCircleOutlineOutlinedIcon />}
      >
        <span className={styles.label}>Set On Lists</span>
      </Button>

      <Menu
        anchorEl={anchor}
        id={id}
        open={open}
        sx={{ marginTop: "20px" }}
        disableScrollLock={true}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
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
        </MenuItem>
        <Divider />
        <MenuItem>
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
        </MenuItem>
        <Divider />
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                checked={countryList.countriesLived}
                onChange={handleChangeSwitch}
                name="countriesLived"
              />
            }
            label="Lived"
          />
        </MenuItem>
      </Menu>
    </>
  );
};
