import { useParams } from "react-router-dom";

export const Country = () => {
  const countryCodeFromUrl = useParams<{ countryCode: string }>();
  // console.log(countryCodeFromUrl);
  return <div>hi</div>;
};
