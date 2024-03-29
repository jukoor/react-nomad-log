import {
  Badge,
  Box,
  ButtonGroup,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  Pagination,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { UserDataContext } from "../../pages/Profile";
import styles from "../../styles/BucketList.module.scss";
import { getCountryData, getEmojiFlag } from "../../utils/countryDataUtils";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { setSelectedCountry } from "../../store/countrySlice";
import { toggleCountryDetailsOverlay } from "../../store/appSlice";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useUpdateFirebaseField } from "../../services/firebaseHelper";
import { UserType } from "../../types/UserType";

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

export const BucketList = () => {
  const userData = useContext(UserDataContext);
  const countries = useAppSelector((state) => state.Country.countries);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(0);
  // @ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // console.log(newValue);
  };

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

  const CountryList = ({ list }: CountryListProps) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
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

    type UpdateFirebaseFieldProps = {
      list: "countriesVisited" | "countriesBucketList" | "countriesLived";
      action: "add" | "remove";
      userDataObj: UserType | undefined;
      selectedCountry: any;
    };

    // const handleRemoveFromList: FC<UpdateFirebaseFieldProps> = ({
    //   list,
    //   action,
    //   userDataObj,
    //   selectedCountry,
    // }) => {
    //   updateFirebaseField({
    //     list: list,
    //     action: action,
    //     userDataObj: userDataObj,
    //     selectedCountry: selectedCountry,
    //   });

    //   return null;
    // };

    const updateField = useUpdateFirebaseField({
      list: list,
      action: "remove",
      userData: userData,
      selectedCountry: undefined, // Initially undefined, will be set on click
    });

    // Example usage within a button click handler
    //  const handleClick = (selectedCountryName: string) => {
    //   updateField({
    //     ...updateField
    //   });
    //   updateField()
    //  };

    return (
      <List className={styles.orderedList}>
        {paginatedCountryList.map((item: any, index: any) => {
          let singleCountry = getCountryData(item, countries);
          return (
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
                    // onClick={() => handleClick(singleCountry.cca2)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </ButtonGroup>
              }
            >
              <span className={styles.flag}>{getEmojiFlag(item)}</span>
              {singleCountry?.name.common}
            </ListItem>
          );
        })}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ marginTop: 2 }}
        />
      </List>
    );
  };

  return (
    <>
      {userData && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              color="text.secondary"
              gutterBottom
            >
              Bucket List
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Lists of countries visited, bucket list countries and countries lived in."
                >
                  {/*
               badgeContent={userData?.countriesVisited.length}
              badgeContent={3}
              color="primary"
            > */}
                  <Tab label="Visited" {...a11yProps(0)} />
                  {/* </Badge> */}
                  <Tab label="Bucket List" {...a11yProps(1)} />
                  <Tab label="Lived in" {...a11yProps(2)} />
                </Tabs>
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
