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
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { useUpdateUserDocument } from "../hooks/useUpdateUserDocument";
import { UserType } from "../types/UserType";

export const SettingsForm = () => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const { updateUserDocument } = useUpdateUserDocument();

  // On Submit: check required fields (validation), post updated form values to firebase store
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(data.entries());

    console.log(formValues);

    // Initialize errors object
    const newErrors: { [key: string]: string } = {};

    // Validate required fields
    const requiredFields = ["nameFirst", "nationality"];
    requiredFields.forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Update errors state
    setFormErrors(newErrors);

    // If there are no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      // Form submission
      // Update Userdata in Firebase Store
      updateUserDocument(formValues as unknown as UserType);
    } else {
      console.log("Validation Errors present");
    }
  };

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
          <Typography variant="h3">🤠 Your Profile</Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth={true}
                  required
                  error={!!formErrors.nameFirst}
                >
                  <InputLabel htmlFor="nameFirst" shrink>
                    First Name
                  </InputLabel>
                  <TextField
                    autoComplete="given-name"
                    name="nameFirst"
                    error={!!formErrors.nameFirst}
                    fullWidth
                    id="nameFirst"
                    autoFocus
                  />
                  {formErrors.nameFirst && (
                    <FormHelperText>{formErrors.nameFirst}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="nameLast" shrink>
                    Last Name
                  </InputLabel>
                  <TextField
                    autoComplete="family-name"
                    name="nameLast"
                    fullWidth
                    id="nameLast"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="bio" shrink>
                    Bio
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="bio"
                    name="bio"
                    label="Bio"
                    multiline
                    placeholder="Your Bio. Tell us something about yourself :) where do you like to travel?"
                    rows={4}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 0, width: "100%" }}>
                  <InputLabel htmlFor="tags" shrink>
                    Tags
                  </InputLabel>
                  <Select
                    id="tags"
                    name="tags"
                    label="tags"
                    placeholder="Your Bio Tags. Whats your travel style? "
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true} error={!!formErrors.nationality}>
                  <InputLabel htmlFor="nationality" shrink>
                    Nationality
                  </InputLabel>
                  <TextField
                    name="nationality"
                    required
                    error={!!formErrors.nationality}
                    fullWidth
                    id="nationality"
                    label="Nationality"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {formErrors.nationality && (
                    <FormHelperText>{formErrors.nationality}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="homeTown" shrink>
                    Home Town
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="homeTown"
                    label="Home Town"
                    name="homeTown"
                    autoComplete="town"
                    InputLabelProps={{
                      shrink: true,
                    }}
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
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
