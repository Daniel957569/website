import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./account.css";
import { getCurrentUser } from "../../services/authService";
import Avatar from "@mui/material/Avatar";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { getUserById, updateUserImage } from "./../../services/linkService";
import { TextField, Grid } from "@mui/material";

let userId;

const Account = () => {
  const [userImage, setUserImage] = useState("");

  userId = !getCurrentUser() ? "" : ({ _id: userId } = getCurrentUser());

  useEffect(() => {
    const asyncEffect = async () => {
      userId = userId["_id"];
      if (!userId) return null;

      const image = await getUserById(userId);

      if (image.data.imageUrl === userImage) return null;
      else if (!image.data.imageUrl) {
        setUserImage("/static/images/avatar/2.jpg");
      } else {
        setUserImage(image.data.imageUrl);
      }
    };
    asyncEffect();
    console.log("userImage = " + userImage);
  }, [userImage]);

  const urlCurrent = "http://localhost:3001/api/";
  const publicKey = "public_Ya9B75ifvPIaFRub32k0cljsdiU=";
  const urlEndpoint = "https://ik.imagekit.io/n5ptomljd";
  const authenticationEndpoint = urlCurrent + "image";

  const handleImageUpload = async (e) => {
    try {
      const { _id } = getCurrentUser();
      await updateUserImage(_id, e.url);
      console.log(userId);
      setUserImage(await e.url);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="main">
      <div>
        <div className="box">
          <Avatar
            alt="Remy Sharp"
            src={userImage}
            sx={{
              margin: "auto",
              width: "100px",
              height: "100px",
            }}
          />
          <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticationEndpoint={authenticationEndpoint}
          >
            <IKUpload
              hidden
              tags={[userId]}
              id="button_id"
              onError={(e) => console.log(e)}
              onSuccess={handleImageUpload}
            />
            <label className="inputPoiner" htmlFor="button_id">
              <Button variant="contained" className="button_label">
                Upload
              </Button>
            </label>
          </IKContext>
        </div>

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
              // onChange={handleEmailChange}
              id="outlined-required"
              label="Email"
              required
              variant="outlined"
              helperText="Update Your Email"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Account;
