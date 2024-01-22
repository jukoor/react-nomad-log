import { useDispatch } from "react-redux";
import { addSelectedCountry } from "../store/countrySlice";
import { Country } from "../types/Country";
import { Countries } from "../types/Countries";
const dispatch = useDispatch();

export const DataLoader = async () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all",
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    dispatch(addSelectedCountry(result));
  } catch (error) {
    console.log("error", error);
  }
};
