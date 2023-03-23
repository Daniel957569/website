import React, { useEffect, useState } from "react";
import { getVideoById, getVideoByVideoId } from "../../services/linkService";
import "./videoWatch.css";
import { Paper, Typography, Grid } from "@mui/material";

const VideoWatch = () => {
  const [video, setVideo] = useState({});
  const [Iframe, setIframe] = useState(false);

  useEffect(() => {
    const test = async () => {
      const url = document.URL;
      const id = url.slice(url.length - 24, url.length);
      const { data } = await getVideoByVideoId(id);
      const vid = data[0];
      if (data[0].isIframe) setIframe(true);

      setVideo({
        videoUrl: vid.videoUrl,
        date: vid.date,
        userId: vid.userId,
        _id: vid._id,
        originalVideoUrl: vid.originalVideoUrl,
      });
    };
    test();
  }, [Iframe]);

  return (
    <div>
      {!Iframe ? (
        <video
          alt="video"
          controls
          height="500"
          width="1000"
          src={video.videoUrl}
        />
      ) : (
        <iframe
          controls
          height="500"
          width="1000"
          src={video.videoUrl}
          frameBorder="0"
        />
      )}
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
          <Typography> Uploaded: {video.date}</Typography>
          <Typography> UserId: {video.userId}</Typography>
          <Typography> Video_Id: {video._id}</Typography>
        </Paper>
      </div>
      <Paper
        sx={{
          height: "relative",
          width: "70%",
          margin: "auto",
          marginTop: "-3rem",
        }}
        elevation={10}
      >
        <Typography>
          {" "}
          Video_Url:{" "}
          <a className="changeToWhite" href={video.originalVideoUrl}>
            {video.originalVideoUrl ? video.originalVideoUrl : video.videoUrl}
          </a>
        </Typography>
      </Paper>
    </div>
  );
};

export default VideoWatch;
