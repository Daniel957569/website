import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";

const Cards = ({
  userImage,
  linkData,
  videoData,
  photoData,
  cardClicked,
  rerender,
}) => {
  let currnetSectionClick = "";
  console.log(cardClicked);

  useEffect(() => {
    try {
      if (cardClicked["Links"]) currnetSectionClick = "link";
      if (cardClicked["Videos"]) currnetSectionClick = "video";
      if (cardClicked["Photos"]) currnetSectionClick = "photo";
    } catch (ex) {
      console.log(ex);
    }
  }, [rerender]);

  console.log(currnetSectionClick);
  return (
    <div>
      {
        <Card sx={{ maxWidth: 345, marginLeft: "2rem", marginBottom: "2rem" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={userImage}
              alt="profile image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      }
    </div>
  );
};

export default Cards;
