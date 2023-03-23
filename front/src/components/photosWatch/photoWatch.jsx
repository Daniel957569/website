import React, { useState, useEffect } from "react";
import { getImageByImageId } from "../../services/linkService";
import { Paper, Typography, Grid } from "@mui/material";

import "./photoWatch.css";

const PhotoWatch = () => {
  const [image, setImage] = useState({});

  useEffect(() => {
    const test = async () => {
      const url = document.URL;
      const id = url.slice(33, url.length);
      console.log(id);
      const { data } = await getImageByImageId(id);
      const vid = data[0];
      console.log(vid);
      setImage({
        imageUrl: vid.imageUrl,
        date: vid.date,
        userId: vid.userId,
        _id: vid._id,
      });
    };
    test();
  }, []);

  return (
    <div>
      <img alt="image" controls height="28%" width="28%" src={image.imageUrl} />
      <div className="video__details">
        <Paper
          sx={{
            height: "5rem",
            width: "22rem",
            marginTop: "-1rem",
            margin: "auto",
          }}
          elevation={10}
        >
          <Typography> Uploaded: {image.date}</Typography>
          <Typography> UserId: {image.userId}</Typography>
          <Typography> Image_Id: {image._id}</Typography>
        </Paper>
        <Paper
          sx={{
            height: "1.5rem",
            width: "40rem",
            position: "absolute",
            left: "40rem",
            top: "48rem",
          }}
          elevation={10}
        >
          <Typography>
            {" "}
            Image_Url:{" "}
            <a className="changeToWhite" href={image.imageUrl}>
              {image.imageUrl}
            </a>
          </Typography>
        </Paper>
      </div>
    </div>
  );
};

export default PhotoWatch;
