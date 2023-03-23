import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import "./signup.css";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  getCurrentUser,
  login,
  loginWithJwt,
} from "../../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../services/httpServices";
import SendIcon from "@mui/icons-material/Send";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    console.log("Password = " + e.currentTarget.value);
    setPassword(e.currentTarget.value);
  };

  const handleEmailChange = (e) => {
    console.log("Email = " + e.currentTarget.value);
    setEmail(e.currentTarget.value);
  };

  const handleNameChange = (e) => {
    console.log("Email = " + e.currentTarget.value);
    setName(e.currentTarget.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser({
        name,
        email,
        password,
      });
      loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Please Enter Valid Password or Email", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(ex);
      }
    }
  };

  if (getCurrentUser()) return (window.location = "/login");

  return (
    <React.Fragment>
      <Grid
        container
        direction={"column"}
        spacing={2.5}
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "75ch",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid item>
          <TextField
            onChange={handleNameChange}
            id="outlined-required 1"
            label="Username"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={handleEmailChange}
            id="outlined-required 2"
            label="Email"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <FormControl sx={{ m: 1, width: "75ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
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
              label="Password"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Button
        onClick={handleRegister}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Login
      </Button>
    </React.Fragment>
  );
};

export default SignUp;
