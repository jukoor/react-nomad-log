import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginType } from "../types/RegisterType";
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
import LoginIcon from "@mui/icons-material/Login";
import styles from "../styles/SignUpForm.module.scss";

export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: { email: "", password: "" },
  });

  const { loginUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    // Set loading spinner for 3 seconds
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);

    // create new firebase auth user with form values
    loginUser(data);
  };

  return (
    <Box sx={{ padding: "0 14px" }}>
      <form
        className={styles.sidebarForm}
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
                sx={{ color: "white" }}
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
                sx={{ color: "white" }}
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
          startIcon={
            loading ? (
              <CircularProgress size={18} sx={{ color: "white" }} />
            ) : (
              <LoginIcon />
            )
          }
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Box>
  );
};
