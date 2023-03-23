import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./login.css";
import { Grid, InputAdornment, InputLabel } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { getCurrentUser, login } from "../../services/authService";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import { FormControl } from "@mui/material";
import { OutlinedInput } from "@mui/material";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    console.log("Password = " + e.currentTarget.value);
    setPassword(e.currentTarget.value);
  };

  const handleEmailChange = (e) => {
    console.log("Email = " + e.currentTarget.value);
    setEmail(e.currentTarget.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLoginSumbit = async () => {
    try {
      await login(email, password);
      console.log(await login(email, password));
      console.log("It Worked!");
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

  if (getCurrentUser()) return (window.location = "/");

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
            onChange={handleEmailChange}
            id="outlined-required"
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
        onClick={handleLoginSumbit}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Login
      </Button>
    </React.Fragment>
  );
};

export default Login;

{
  /* <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <TextField
            onChange={handlePasswordChange}
            type={showPassword ? "text" : "password"}
            id="outlined-adornment-password"
            value={password}
            label="Password"
            variant="outlined"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          /> */
}
