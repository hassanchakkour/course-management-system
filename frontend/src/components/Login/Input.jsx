import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input = ({ label, type, value, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : type}
      value={value}
      onChange={handleChange}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Input;
