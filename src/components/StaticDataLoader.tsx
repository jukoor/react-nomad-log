export const loadCountryMetaDataFromAPI = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow" as RequestRedirect,
  };

  fetch(
    "https://countriesnow.space/api/v0.1/countries/info?returns=capital,population,currency,states,cities",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
