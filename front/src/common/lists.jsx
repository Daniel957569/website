import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Pagination,
  Stack,
  Checkbox,
  CardActions,
} from "@mui/material";
import "../components/videos/videos.css";
import { toInteger } from "lodash";
import { pagination } from "./../utils/paginate";
import { getCurrentUser } from "../services/authService";

const Lists = ({ getUpload, type }) => {
  const [upload, setUpload] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const user = getCurrentUser();
  const pageSize = 10;
  const paginationCount = Math.ceil(upload.length / pageSize);
  const paginate = pagination(upload, currentPage, pageSize);

  useEffect(() => {
    async function getUserUpload() {
      getUpload().then((e) => setUpload(e.data));
    }
    getUserUpload();
  }, []);

  const url = document.URL;
  const paging = url.slice(url.length - 5, url.length);
  console.log(paging);

  const handlePageChange = (e) => {
    console.log(e.target.outerText);
    const pageNumber = toInteger(e.target.outerText);
    setCurrentPage(pageNumber);
  };

  // update when adding photos
  const onCardClick = (v) => {
    window.location = `/${paging}Watch/${v._id}`;
  };

  let keyNum = 1000;

  return (
    <div>
      <div className="video__layout">
        <Grid
          container
          // marginLeft="3rem"
          rowSpacing={0}
          key={keyNum++}
          columnSpacing={{ xs: -20, sm: -10, md: -3 }}
          spacing={0}
        >
          {paginate.map((v, index) => (
            <Card
              raised={true}
              sx={{
                maxWidth: 270,
                minWidth: 270,
                minHeight: 280,
                maxHeight: 280,
                marginLeft: "2rem",
                marginBottom: "2rem",
              }}
              key={++keyNum}
              onClick={() => {
                onCardClick(v);
              }}
            >
              <CardActionArea>
                <CardMedia
                  component={v.image_preview ? "img" : type}
                  height="140"
                  image={
                    v.image_preview
                      ? v.image_preview
                      : !v.videoUrl
                      ? v.imageUrl
                      : v.videoUrl
                  }
                  alt={type}
                />
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    {v.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {v.description}
                  </Typography>
                  <Typography
                    paddingTop={3}
                    variant="body2"
                    color="text.secondary"
                  >
                    Date: {v.date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
          {/* </div> */}
        </Grid>
        {upload.length === 0 ? <h1>Upload Down Here</h1> : null}
        {user ? (
          <div className="upload__video">
            <Button
              sx={{ marginTop: "1rem" }}
              onClick={() => {
                window.location =
                  paging === "photo" ? `/${paging}/${paging}sForm` : "/upload";
              }}
              variant="outlined"
            >
              Upload
            </Button>
          </div>
        ) : null}
        <div className="paginate__buttons">
          {paginationCount <= 1 ? null : (
            <Stack spacing={2} justifyContent="center" direction="row">
              <Pagination
                count={paginationCount}
                page={currentPage}
                defaultPage={1}
                onChange={handlePageChange}
                boundaryCount={2}
                variant="outlined"
                hidePrevButton
                hideNextButton
              />
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lists;
