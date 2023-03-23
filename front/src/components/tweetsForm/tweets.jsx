import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
// import "./formInput.css";
import axios from "axios";
import { Grid, makeStyles, InputLabel, NativeSelect } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "../../services/authService";
import "../../common/imageKit.css";
import { createVideo, createImage } from "../../services/linkService";
import http from "../../services/httpServices";
import LoadingButton from "../../common/loadingButton";

let userId;
let createUpload;
let type;
let urlCurrent = "http://localhost:3001/api/";

const TweetsForm = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [tweetVideo, setTweetVideo] = useState("");
  const [currnetUploadMode, setCurrnetUploadMode] = useState("Tweets");
  const [applyMode, setApplyMode] = useState("Tweets");
  const [isApply, setIsApply] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!getCurrentUser()) window.location = "/not-found";

  useEffect(() => {
    async function insideEffect() {
      try {
        console.log("before");
        console.log(tweetId);
        if (!tweetId) return "";
        if (currnetUploadMode !== "Tweets") return "";
        const result = await http.post(`${urlCurrent}twitterAPI`, {
          tweetId,
        });
        console.log("middle");
        console.log(result);
        if (!result && link)
          toast.error("Please Enter Valid TweetUrl", {
            position: toast.POSITION.TOP_RIGHT,
          });
        setTweetVideo(result.data);
      } catch (ex) {
        console.log("1");
      }
    }
    insideEffect();
  }, [tweetId]);

  userId = !getCurrentUser() ? "" : ({ _id: userId } = getCurrentUser());

  let updatedLink;

  const handleUpload = async (e) => {
    try {
      await createVideo(tweetVideo, "Tweet: " + description, name, userId);
      setIsLoading(true);
      setTimeout(() => {
        window.location = "/video";
      }, 2000);
    } catch (ex) {
      console.log("dsad");
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
        <NativeSelect
          onChange={(e) => setCurrnetUploadMode(e.currentTarget.value)}
          defaultValue={"Tweets"}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
          sx={{ width: "25%", margin: "auto" }}
        >
          <option value={"Tweets"}>Tweets</option>
        </NativeSelect>
        <Grid item>
          <TextField
            onChange={(e) => setName(e.currentTarget.value)}
            required
            id="outlined-required"
            label="Title"
            helperText="Please Enter The Title"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={(e) => setDescription(e.currentTarget.value)}
            required
            id="outlined-required"
            label="Description"
            helperText="Please Enter The Description"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={(e) => {
              setLink(e.currentTarget.value);
            }}
            required
            id="outlined-required"
            label="Link"
            helperText="Please Enter The Link"
          />
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          marginLeft: "1rem",
          display: "flex",
          justifyContent: "left",
          alignItems: "left",
        }}
      >
        <Button
          disabled={link && name && description ? false : true}
          variant="outlined"
          onClick={() => {
            setIsApply(true);
            setApplyMode(currnetUploadMode);
            setTweetId(
              currnetUploadMode === "Tweets"
                ? link.slice(link.length - 19, link.length)
                : ""
            );
          }}
        >
          apply
        </Button>
      </Grid>
      <Grid
        item
        sx={{
          marginTop: "-2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isLoading ? (
          <Button
            disabled={isApply ? false : true}
            variant="outlined"
            onClick={handleUpload}
          >
            sumbit
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Box>
  );
};

export default TweetsForm;
