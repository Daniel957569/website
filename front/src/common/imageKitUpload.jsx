import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
// import "./formInput.css";
import axios from "axios";
import { Grid, makeStyles, InputLabel, NativeSelect } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../services/authService";
import "./imageKit.css";
import { createVideo, createImage } from "../services/linkService";
import LoadingButton from "./loadingButton";

let userId;
let createUpload;
let type;

const ImageKitUpload = () => {
  const [upload, setUpload] = useState("");
  const [description, setDescription] = useState("");
  const [uploadName, setUploadName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!getCurrentUser()) window.location = "/not-found";
  const url = document.URL;
  const id = url.slice(28, url.length);
  if (id === "videosForm") {
    createUpload = createVideo;
    type = "video";
  }
  if (id === "photosForm") {
    createUpload = createImage;
    type = "photo";
  }

  userId = !getCurrentUser() ? "" : ({ _id: userId } = getCurrentUser());

  const publicKey = process.env.IMAGE_KIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGE_KIT_URL_ENDPOINT;
  const authenticationEndpoint = process.env.IMAGE_KIT_authenticationEndpoint;

  const handeleNameChange = (e) => {
    console.log(e.currentTarget.value);

    setUploadName(e.currentTarget.value);
  };

  const handleOnDescriptionChange = (e) => {
    console.log(e.currentTarget.value);

    setDescription(e.currentTarget.value);
  };

  const handleUpload = async (e) => {
    try {
      setIsLoading(false);
      setUpload(e.url);
      console.log(e);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Box
      sx={{
        margin: "auto",
        // border: "1px solid red",
        height: "50%",
        width: "39%",
      }}
    >
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
            onChange={handeleNameChange}
            required
            id="outlined-required"
            label="Name"
            helperText="Please Enter The Name"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={handleOnDescriptionChange}
            required
            id="outlined-required"
            label="Description"
            helperText="Please Enter The Description"
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        // alignItems="center"
        // justifyContent="center"
      >
        <Grid item>
          <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticationEndpoint={authenticationEndpoint}
          >
            <IKUpload
              hidden
              tags={[userId]}
              onChange={() => setIsLoading(true)}
              id="button_id"
              onError={(e) => console.log(e)}
              onSuccess={handleUpload}
            />
            <label className="inputPoiner test" htmlFor="button_id">
              {!isLoading ? (
                <Button variant="outlined" className="button_label">
                  Upload
                </Button>
              ) : (
                <CircularProgress sx={{ margin: "auto" }} />
              )}
            </label>
          </IKContext>
        </Grid>
        <Grid
          item
          sx={{
            marginLeft: "auto",
            marginTop: "-1rem",
            paddingRight: "0.5rem",
          }}
        >
          <LoadingButton
            upload={upload}
            description={description}
            name={uploadName}
            createUpload={createUpload}
            disabled={isLoading}
            _id={userId}
            type={type}
            variant="contained"
            className="Loading__Button"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageKitUpload;
