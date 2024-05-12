import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  CardContent,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  FormHelperText,
  Alert,
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
import { useEffect } from "react";
import { CountrySelectDropdown } from "./CountrySelectDropdown";

export const SettingsForm = () => {
  const { updateUserDocument } = useUpdateUserDocument();

  const userData = useAppSelector((state) => state.User.selectedUser);

  const formDefaultValues: UserType = {
    uid: "",
    nameFirst: "",
    nameLast: "",
    bio: "",
    tags: [],
    homeTown: "",
    nationality: "",
    countriesVisited: [],
    countriesBucketList: [],
    countriesLived: [],
  };

  // ToDo: store and fetch from firebase
  const tags = [
    "🎒 Backpacking",
    "🏨 All-Inclusive Hotel",
    "🏝️ Lazy Beach Time",
    "🗼 Sightseeing",
  ];

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
      console.log(userData);
      reset(userData);
    }
  }, [userData]);

  // On submit update the users profile data in firestore db
  const onSubmit: SubmitHandler<UserType> = (data) => {
    console.log(data);

    const formData = data as UserType;

    updateUserDocument(formData);
  };

  return (
    <Container component="main" sx={{ marginTop: "50px" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Update Your Profile
          </Typography>
          <FormProvider {...profileFormMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="nameFirst" required shrink>
                      First Name
                    </InputLabel>
                    <Controller
                      control={control}
                      name="nameFirst"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="nameFirst"
                          error={!!errors.nameFirst}
                          onChange={onChange}
                          value={value}
                          fullWidth
                        />
                      )}
                    />
                    {errors.nameFirst && (
                      <FormHelperText className="Mui-error">
                        Please tell us your first name 🙂
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="nameLast" shrink>
                      Last Name
                    </InputLabel>
                    <Controller
                      control={control}
                      name="nameLast"
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          id="nameLast"
                          error={!!errors.nameLast}
                          onChange={onChange}
                          value={value}
                          fullWidth
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="bio" shrink>
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
                          placeholder="Your Bio. Tell us something about yourself :) where do you like to travel?"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ m: 0, width: "100%" }}>
                    <InputLabel id="tagsLabel" shrink>
                      Tags
                    </InputLabel>
                    <Controller
                      control={control}
                      name="tags"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          id="tags"
                          labelId="tagsLabel"
                          name="tags"
                          label="tags"
                          placeholder="Your Bio Tags. What's your travel style?"
                          multiple
                          sx={{ minHeight: "65px" }}
                          value={value}
                          onChange={onChange}
                          error={!!errors.tags}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                        >
                          {tags.map((tag) => (
                            <MenuItem key={tag} value={tag}>
                              {tag}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth={true} error={!!errors.nationality}>
                    <InputLabel htmlFor="nationality" required shrink>
                      Nationality
                    </InputLabel>
                    <Controller
                      control={control}
                      name="nationality"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          error={!!errors.nationality}
                          onChange={onChange}
                          value={value}
                          fullWidth
                          id="nationality"
                          label="Nationality"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                    {errors.nationality && (
                      <FormHelperText className="Mui-error">
                        Please tell us your nationality 🙂
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="homeTown" shrink>
                      Home Town
                    </InputLabel>
                    <Controller
                      control={control}
                      name="homeTown"
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          error={!!errors.homeTown}
                          onChange={onChange}
                          value={value}
                          fullWidth
                          id="homeTown"
                          label="Home Town"
                          autoComplete="town"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Alert variant="filled" severity="info">
                    Select all the countries that you have (1) visited, (2) that
                    are on your Bucket List and (3) those you lived in.
                  </Alert>
                </Grid>

                <Grid item xs={12}>
                  <CountrySelectDropdown fieldType="Visited" />
                </Grid>
                <Grid item xs={12}>
                  <CountrySelectDropdown fieldType="Lived" />
                </Grid>
                <Grid item xs={12}>
                  <CountrySelectDropdown fieldType="BucketList" />
                </Grid>
              </Grid>
              <Grid
                sx={{ mt: 5 }}
                container
                spacing={4}
                justifyContent="center"
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
                >
                  Save Changes
                </Button>
              </Grid>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </Container>
  );
};