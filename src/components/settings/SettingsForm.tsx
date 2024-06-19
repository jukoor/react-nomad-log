import {
  Container,
  Grid,
  TextField,
  Typography,
  CardContent,
  Card,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import { useUpdateUserDocument } from "../../hooks/useUpdateUserDocument";
import { UserType } from "../../types/UserType";
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from "react-hook-form";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { CountrySelectDropdown } from "./CountrySelectDropdown";
import { TagsSelectDropdown } from "./TagsSelectDropdown";
import { CustomInputField } from "./CustomInputField";

export const SettingsForm = () => {
  const { updateUserDocument } = useUpdateUserDocument();

  const [loading, setLoading] = useState(false);
  const userData = useAppSelector((state) => state.User.selectedUser);

  const formDefaultValues: UserType = {
    uid: "",
    nameFirst: "",
    nameLast: "",
    bio: "",
    tags: [],
    livingInCity: "",
    homeCountry: [],
    countriesVisited: [],
    countriesBucketList: [],
    countriesLived: [],
  };

  const profileFormMethods = useForm<UserType>({
    defaultValues: formDefaultValues,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = profileFormMethods;

  // Reset user data values from firebase into form fields
  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData]);

  // On submit update the users profile data in firestore db
  const onSubmit: SubmitHandler<UserType> = async (data) => {
    console.log(data);

    // Set loading spinner for 5 seconds
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setLoading(false);

    const formData = data as UserType;

    updateUserDocument(formData);
  };

  return (
    <Container component="main">
      <Card
        sx={{
          minWidth: 275,
          boxShadow: "0px 0px 20px 11px #00000012",
          borderRadius: "25px",
          backgroundColor: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(5px)",
        }}
      >
        <CardContent sx={{ padding: { xs: "20px", sm: "20px", md: "30px" } }}>
          <Typography
            variant="h4"
            sx={{
              mb: { xs: 3, sm: 4, md: 5 },
              fontSize: { xs: "1rem", sm: "1.25rem", md: "2.0rem" },
            }}
          >
            Update Your Profile
          </Typography>
          <FormProvider {...profileFormMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <CustomInputField
                    fieldName="nameFirst"
                    label="First Name *"
                    required={true}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomInputField
                    fieldName="nameLast"
                    label="Last Name"
                    required={false}
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth={true}>
                    <InputLabel
                      htmlFor="bio"
                      style={{ display: "none" }}
                      hidden
                    >
                      Bio
                    </InputLabel>
                    <Controller
                      control={control}
                      name="bio"
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="bio"
                          error={!!errors.bio}
                          onChange={onChange}
                          value={value}
                          fullWidth
                          multiline
                          rows={4}
                          disabled={loading}
                          placeholder="Tell us something about yourself 🙂 Where and how do you like to travel?"
                          label="Bio"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TagsSelectDropdown disabled={loading} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CountrySelectDropdown
                    multiple={false}
                    label="Country *"
                    fieldName="homeCountry"
                    required={true}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomInputField
                    fieldName="livingInCity"
                    label="Home Town"
                    required={false}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Alert
                    variant="filled"
                    severity="info"
                    sx={{
                      background: "transparent",
                      color: "#212121",
                      fontSize: "14px",
                      border: "2px solid #212121",
                      fontWeight: "bold",
                      marginTop: "25px",
                    }}
                  >
                    Select all the countries that you have (1) visited, (2) that
                    are on your Bucket List and (3) those you lived in.
                  </Alert>
                </Grid>

                <Grid item xs={12}>
                  <CountrySelectDropdown
                    label="Visited"
                    fieldName="countriesVisited"
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CountrySelectDropdown
                    label="Bucket List"
                    fieldName="countriesBucketList"
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CountrySelectDropdown
                    label="Lived"
                    fieldName="countriesLived"
                    disabled={loading}
                  />
                </Grid>
              </Grid>
              <Grid
                sx={{ mt: 5 }}
                container
                spacing={4}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={loading}
                  type="submit"
                  sx={{ minWidth: "200px", fontWeight: "bold" }}
                  endIcon={loading ? <CircularProgress size={24} /> : null}
                >
                  {loading ? "Loading..." : "Save Changes"}
                </Button>
              </Grid>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </Container>
  );
};
