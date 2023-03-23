import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getImageByImageId,
  getVideoByVideoId,
  updateImageById,
  updateVideoById,
} from "../../services/linkService";
import "./edit.css";
import { Box, Grid, Button } from "@mui/material";

const Edit = () => {
  const [fieldName, setFieldName] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");

  const url = document.URL;
  const type = url.slice(url.length - 35, url.length - 34);
  const id = url.slice(url.length - 24, url.length);

  useEffect(() => {
    async function asyncEffect() {
      let getEditDetails;
      if (type === "v") getEditDetails = getVideoByVideoId;
      if (type === "p") getEditDetails = getImageByImageId;

      const id = url.slice(url.length - 24, url.length);
      const { data } = await getEditDetails(id);
      console.log(data[0].name);
      setFieldDescription(data[0].description);
      setFieldName(data[0].name);
    }
    asyncEffect();
  }, []);

  return (
    <div className="edit__overlay">
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={fieldName}
          onChange={(e) => setFieldName(e.currentTarget.value)}
          required
          id="outlined-required"
          label="Name"
          helperText="Update The Name*"
        />
        <TextField
          value={fieldDescription}
          required
          onChange={(e) => setFieldDescription(e.currentTarget.value)}
          label="Description"
          id="outlined-required"
          helperText="Update The Description*"
        />
        <Button
          onClick={() => {
            type === "v"
              ? updateVideoById(id, fieldName, fieldDescription)
              : updateImageById(id, fieldName, fieldDescription);
            window.location = "/";
          }}
          sx={{ marginTop: "1rem" }}
          variant="outlined"
        >
          Update
        </Button>
      </Grid>
    </div>
  );
};

export default Edit;
