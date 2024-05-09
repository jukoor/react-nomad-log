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
} from "@mui/material";
import { useUpdateUserDocument } from "../hooks/useUpdateUserDocument";
import { UserType } from "../types/UserType";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export const SettingsForm = () => {
  const { updateUserDocument } = useUpdateUserDocument();

  const formDefaultValues = {
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: formDefaultValues,
  });

  // On submit update the users profile data in firestore db
  const onSubmit: SubmitHandler<UserType> = (data) => {
    console.log(data);

    const formData = data as UserType;

    updateUserDocument(formData);
  };

  // ToDo: store and fetch from firebase
  const tags = [
    "Backpacking",
    "All-Inclusive Hotel",
    "Lazy Beach Time",
    "Sightseeing",
  ];

  return (
    <Container component="main" sx={{ marginTop: "50px" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h3" sx={{ mb: 5 }}>
            🤠 Your Profile
          </Typography>
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
                  <InputLabel htmlFor="tags" shrink>
                    Tags
                  </InputLabel>
                  <Controller
                    control={control}
                    name="tags"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        id="tags"
                        name="tags"
                        label="tags"
                        placeholder="Your Bio Tags. Whats your travel style? "
                        multiple
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
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontWeight: "bold" }}
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};
