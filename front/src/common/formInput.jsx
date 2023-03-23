import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
// import "./formInput.css";
import axios from "axios";
import { Grid, makeStyles } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../services/authService";
import Mines from "./../components/mines/mines";

const FormInput = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  if (!getCurrentUser()) window.location = "/not-found";
  const inputPropsName = {
    name,
  };
  const inputPropsLink = {
    link,
  };

  const whatUrl = (currentUrl) => {
    console.log(currentUrl);
    if (currentUrl === "http://localhost:3000/videos/videosForm")
      return "videos";
    if (currentUrl === "http://localhost:3000/links/linksForm") return "links";
    return "photos";
  };

  const handleTextChangeName = (e) => {
    console.log(e.currentTarget.value);

    setName(e.currentTarget.value);
  };

  const handleTextChangeLink = (e) => {
    console.log(e.currentTarget.value);
    setLink(e.currentTarget.value);
  };

  const handleFormSumbit = async (e) => {
    try {
      const user = getCurrentUser();
      await axios.post("http://localhost:3001/api/" + whatUrl(document.URL), {
        name,
        link,
        userId: user._id,
      });
      console.log(name, link);
      window.location = "/";
    } catch (ex) {
      toast.error("Please Enter Valid Name or Link", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(ex);
    }
  };

  return (
    <div className="size__div">
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
            onChange={handleTextChangeName}
            required
            inputProps={inputPropsName}
            id="outlined-required"
            label="Name"
            helperText="Please enter your name"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={handleTextChangeLink}
            required
            inputProps={inputPropsLink}
            id="outlined-required"
            label="Link"
            helperText="Please enter your link"
          />
        </Grid>
      </Grid>
      <Button
        onClick={handleFormSumbit}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </div>
  );
};

export default FormInput;
