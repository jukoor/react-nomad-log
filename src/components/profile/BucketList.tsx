import {
  ButtonGroup,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { UserDataContext } from "../../pages/Profile";
import { UserType } from "../../types/UserType";
import styles from "../../styles/BucketList.module.scss";
import { getCountryData, getEmojiFlag } from "../../utils/countryDataUtils";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { setSelectedCountry } from "../../store/countrySlice";
import { toggleCountryDetailsOverlay } from "../../store/appSlice";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const BucketList = () => {
  const userData = useContext(UserDataContext) as UserType;
  const countries = useAppSelector((state) => state.Country.countries);
  const dispatch = useAppDispatch();

  return (
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

        <List component="ol" className={styles.orderedList}>
          {userData?.bucketList.map((item: any, index: any) => {
            let countryName = getCountryData(item, countries);
            return (
              <ListItem
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
                    <IconButton sx={{ marginRight: "5px" }}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </ButtonGroup>
                }
              >
                <span className={styles.flag}>{getEmojiFlag(item)}</span>
                {countryName.name.common}
              </ListItem>
            );
          })}
        </List>

        <Typography variant="h5" letterSpacing={20}></Typography>
      </CardContent>
    </Card>
  );
};
