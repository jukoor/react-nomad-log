import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from "@mui/material";
import { UserType } from "../../types/UserType";

type UserTypeField = keyof UserType;

interface CustomInputFieldProps {
  fieldName: UserTypeField;
  label: string;
  disabled?: boolean;
  required?: boolean;
}

export const CustomInputField: React.FC<CustomInputFieldProps> = ({
  fieldName,
  label,
  disabled,
  required,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserType>();

  return (
    <FormControl fullWidth={true}>
      <InputLabel
        htmlFor={fieldName}
        required={required}
        style={{ display: "none" }}
      >
        {label}
      </InputLabel>
      <Controller
        control={control}
        name={fieldName}
        rules={{ required }}
        render={({ field }) => (
          <TextField
            id={fieldName}
            {...field}
            fullWidth
            disabled={disabled}
            label={label}
          />
        )}
      />

      {errors[fieldName] && (
        <FormHelperText
          sx={{
            background: "#be0606db",
            color: "#fff",
            borderRadius: "5px",
            position: "relative",
            top: "3px",
            margin: 0,
            padding: "0 15px",
          }}
        >
          Please tell us your {label} 🙂
        </FormHelperText>
      )}
    </FormControl>
  );
};
