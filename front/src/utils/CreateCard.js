import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Grid,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  deleteImageByImageId,
  deleteVideoBVideoId,
  getUserById,
} from "../services/linkService";
import { getCurrentUser } from "../services/authService";

export default function createCard(
  cardType,
  data,
  name,
  date,
  userImage,
  type,
  cardId,
  deleteCard,
  image_preview
) {
  const image =
    "https://ik.imagekit.io/n5ptomljd/no-user-image-icon-27_6UH2cvKl9K.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1660663778549";

  return (
    <div>
      <Card
        sx={{
          maxWidth: 300,
          minWidth: 300,
          minHeight: 340,
          maxHeight: 340,
          marginLeft: "2.5rem",
          marginBottom: "1rem",
          // marginBottom: "0%",
          // marginTop: "0%",
        }}
        key={Math.random()}
        raised={true}
        onClick={() =>
          cardType ? (window.location = `/${cardType}Watch/${cardId}`) : null
        }
      >
        <CardActionArea key={Math.random()}>
          <CardMedia
            key={Math.random()}
            component={
              image_preview ? "img" : type === "video" ? "video" : "img"
            }
            height="150"
            image={
              image_preview ? image_preview : !userImage ? image : userImage
            }
            alt="profile image"
          />
          <CardContent>
            <Typography paddingTop={0} variant="body1" key={Math.random()}>
              {name}
            </Typography>
            <Typography
              paddingTop={0}
              variant="body2"
              color="text.secondary"
              key={Math.random()}
            >
              {data}
            </Typography>
            <Typography
              key={Math.random()}
              variant="body2"
              color="text.secondary"
            >
              Date: {date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Paper
        key={Math.random()}
        elevation={8}
        sx={{
          width: "40%",
          display: "flex",
          marginTop: "-15%",
          marginBottom: "13%",
          marginLeft: "36%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EditIcon
          id={cardId}
          onClick={(e) =>
            type === "video"
              ? (window.location = "/video/edit/" + e.currentTarget.id)
              : (window.location = "/photo/edit/" + e.currentTarget.id)
          }
          sx={{ cursor: "pointer" }}
        />
        <DeleteForeverIcon
          id={cardId}
          onClick={(e) => deleteCard(e.currentTarget.id)}
          sx={{ cursor: "pointer", marginLeft: "4rem" }}
        />
      </Paper>
    </div>
  );
}

// window.location = "/edit/:id";
