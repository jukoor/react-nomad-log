import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RegisterType } from "../types/RegisterType";
import {
  Box,
  Button,
  CircularProgress,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";

import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

export const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterType>({ defaultValues: { email: "", password: "" } });

  const { createUserAccount } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    console.log(data);

    // Set loading spinner for 3 seconds
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);

    // create new firebase auth user with form values
    createUserAccount(data);
  };

  return (
    <Box sx={{ padding: "0 14px" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {/* Email Field */}
        <FormControl variant="filled">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <FilledInput
                {...field}
                id="email"
                type="email"
                error={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <FormHelperText
              sx={{
                color: "#d32f2f",
                margin: 0,
              }}
            >
              {errors.email?.message}
            </FormHelperText>
          )}
        </FormControl>

        {/* Password Field */}
        <FormControl variant="filled">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "At least 6 characters long",
              },
            }}
            render={({ field }) => (
              <FilledInput
                {...field}
                id="password"
                error={!!errors.password}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          ></Controller>
          {errors.password && (
            <FormHelperText
              sx={{
                color: "#d32f2f",
                margin: 0,
              }}
            >
              {errors.password?.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} /> : <></>}
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </Box>
  );
};
