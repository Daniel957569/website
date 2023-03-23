import React, { useState, useEffect } from "react";
import { Paper, Stack, Grid, setRef, Pagination } from "@mui/material";
import Chip from "@mui/material/Chip";
import { getCurrentUser } from "../../services/authService";
import {
  deleteImageByImageId,
  deleteVideoBVideoId,
  getDataById,
  getImageByUserId,
  getUserById,
  getVideoById,
  getVideoByUserId,
} from "../../services/linkService";
import "./welcome.css";
import { currentSectionCard, settingTest } from "../../utils/utilFunctions";
import createCard from "./../../utils/CreateCard";
import { toInteger } from "lodash";

const Welcome = () => {
  const [cardClicked, setCardClicked] = useState({});
  const [userImage, setUserImage] = useState("");
  const [linkData, setLinkData] = useState("");
  const [videoData, setVideoData] = useState("");
  const [photoData, setPhotoData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 25;

  useEffect(() => {
    settingTest(setCardClicked);
  }, []);

  useEffect(() => {
    async function asyncEffect() {
      try {
        const user = getCurrentUser();
        const image = await getUserById(user._id);
        setUserImage(image["data"].imageUrl);
        const link = await getDataById("links", user._id);
        const video = await getVideoByUserId(user._id);
        const photo = await getImageByUserId(user._id);

        setLinkData(link["data"]);
        setVideoData(video["data"]);
        setPhotoData(photo["data"]);
      } catch (ex) {
        console.log("error = " + ex);
      }
    }
    asyncEffect();

    return async function cleanUp() {
      return asyncEffect();
    };
  }, []);

  const paginationCount = cardClicked["Links"]
    ? Math.ceil(linkData.length / pageSize)
    : cardClicked["Videos"]
    ? Math.ceil(videoData.length / pageSize)
    : cardClicked["Photos"]
    ? Math.ceil(photoData.length / pageSize)
    : null;

  const handlePageChange = (e) => {
    const pageNumber = toInteger(e.target.outerText);
    setCurrentPage(pageNumber);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleCardClick = (e) => {
    setCardClicked({ Links: false, Videos: false, Photos: false });
    const photo = e.target.outerText === "Photos" ? true : false;
    const link = e.target.outerText === "Links" ? true : false;
    const video = e.target.outerText === "Videos" ? true : false;

    setCardClicked({ Links: link, Videos: video, Photos: photo });
    setCurrentPage(1);
  };

  const deleteImageCard = async (id) => {
    const newData = photoData.filter((image) => image._id !== id);
    setPhotoData(newData);
    await deleteImageByImageId(id);
  };

  const deleteVideoCard = async (id) => {
    const newData = videoData.filter((video) => video._id !== id);
    setVideoData(newData);
    await deleteVideoBVideoId(id);
  };
  let keyNum = 10000;

  return (
    <div key={keyNum++}>
      <div key={keyNum++} className="link__card">
        <Paper
          key={keyNum++}
          sx={{
            height: "3.6rem",
            width: "40rem",
            margin: "auto",
            marginTop: "1%",
            padding: "12px",
          }}
        >
          <Stack
            key={keyNum++}
            justifyContent="center"
            direction="row"
            spacing={1}
          >
            <Chip
              key={keyNum++}
              id="1"
              sx={{
                height: "2rem",
                width: "4rem",
              }}
              label="Links"
              variant={cardClicked.Links ? "" : "outlined"}
              onClick={handleCardClick}
            />
            <Chip
              key={keyNum++}
              id="2"
              sx={{
                height: "2rem",
                width: "5rem",
              }}
              label="Videos"
              variant={cardClicked.Videos ? "" : "outlined"}
              onClick={handleCardClick}
            />
            <Chip
              key={keyNum++}
              sx={{
                height: "2rem",
                width: "5rem",
              }}
              id="3"
              label="Photos"
              variant={cardClicked.Photos ? "" : "outlined"}
              onClick={handleCardClick}
            />
          </Stack>
        </Paper>
        {getCurrentUser() ? (
          <div key={keyNum++} className="cardsContent">
            <Grid
              key={keyNum++}
              container
              marginLeft="3rem"
              rowSpacing={0}
              columnSpacing={{ xs: 10, sm: 1, md: -1 }}
              spacing={0}
              sx={{
                flexGrow: 1,
                margin: "auto",
                // border: "1px solid red",
                height: "65rem",
                width: "100%",
              }}
            >
              {currentSectionCard(
                linkData,
                videoData,
                photoData,
                cardClicked,
                userImage,
                currentPage,
                pageSize,
                deleteImageCard,
                deleteVideoCard
              )}
            </Grid>
          </div>
        ) : null}
        {paginationCount <= 1 ? null : (
          <Stack
            key={keyNum++}
            spacing={2}
            justifyContent="center"
            direction="row"
            marginTop="8rem"
          >
            <Pagination
              key={keyNum++}
              count={paginationCount}
              page={currentPage}
              defaultPage={1}
              onChange={handlePageChange}
              boundaryCount={2}
              variant="outlined"
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Welcome;

// 1//049liqZSyFCH1CgYIARAAGAQSNwF-L9Ir8ezzumySWx-7ZX5pOeacUb-IbrrA6OXZCVF7XjMtsDSAxJSRpLj3qPzlGzE_NV0k9tY
