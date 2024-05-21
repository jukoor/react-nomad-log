import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

const LoadingButtonExample = () => {
  const [loading, setLoading] = useState(false);

  const delaySpinner = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Start loading
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay
    setLoading(false); // End loading after 5 seconds
    // Perform form submission logic here
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        disabled={loading}
        onClick={delaySpinner}
        type="submit"
        endIcon={loading ? <CircularProgress size={24} /> : null}
      >
        {loading ? "Loading..." : "Save Changes"}
      </Button>
    </>
  );
};

export default LoadingButtonExample;
