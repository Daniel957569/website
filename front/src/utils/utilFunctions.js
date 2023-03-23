import { getCurrentUser } from "../services/authService";
import {
  getDataById,
  getImageByImageId,
  getVideoByUserId,
  getImageByUserId,
} from "../services/linkService";
import { pagination } from "./paginate";
import createCard from "./CreateCard";

export async function settingTest(setCardClicked) {
  const user = getCurrentUser();
  const link = await getDataById("links", user._id);
  const video = await getVideoByUserId(user._id);
  const photo = await getImageByUserId(user._id);
  const { length: linkLength } = link.data;
  const { length: photoLength } = photo.data;
  const { length: videoLength } = video.data;

  if (photoLength > linkLength && photoLength > videoLength)
    return setCardClicked({ Links: false, Photos: true, Videos: false });

  if (linkLength > photoLength && linkLength > videoLength)
    return setCardClicked({ Links: true, Photos: false, Videos: false });

  if (videoLength > linkLength && videoLength > photoLength)
    return setCardClicked({ Links: false, Photos: false, Videos: true });

  if (linkLength === 0 && photoLength === 0 && videoLength > 0)
    return setCardClicked({ Links: false, Photos: false, Videos: true });
  if (linkLength === 0 && photoLength > 0 && videoLength === 0)
    return setCardClicked({ Links: false, Photos: true, Videos: false });
  if (linkLength === 0 && photoLength > 0 && videoLength > 0)
    return setCardClicked({ Links: false, Photos: false, Videos: true });
}

export function currentSectionCard(
  linkData,
  videoData,
  photoData,
  cardClicked,
  userImage,
  currentPage,
  pageSize,
  deleteImageCard,
  deleteVideoCard
) {
  try {
    if (cardClicked["Links"]) {
      let cardsLinks = [];
      for (let i = 0; i < linkData.length; i++) {
        cardsLinks.push(
          createCard(
            "",
            linkData[i].link,
            linkData[i].name,
            linkData[i].date,
            userImage
          )
        );
      }
      const paginateLink = pagination(cardsLinks, currentPage, pageSize);
      return paginateLink.map((card) => card);
    }
    if (cardClicked["Videos"]) {
      let cardsVideos = [];
      for (let i = 0; i < videoData.length; i++) {
        cardsVideos.push(
          createCard(
            "video",
            videoData[i].description,
            videoData[i].name,
            videoData[i].date,
            videoData[i].videoUrl,
            "video",
            videoData[i]._id,
            deleteVideoCard,
            videoData[i].image_preview
          )
        );
      }
      const paginateVideo = pagination(cardsVideos, currentPage, pageSize);
      return paginateVideo.map((card) => card);
    }
    if (cardClicked["Photos"]) {
      let cardsPhotos = [];
      for (let i = 0; i < photoData.length; i++) {
        cardsPhotos.push(
          createCard(
            "photo",
            photoData[i].description,
            photoData[i].name,
            photoData[i].date,
            photoData[i].imageUrl,
            "img",
            photoData[i]._id,
            deleteImageCard
          )
        );
      }
      const paginatePhoto = pagination(cardsPhotos, currentPage, pageSize);
      return paginatePhoto.map((card) => card);
    }
  } catch (ex) {
    console.log(cardClicked);
    console.log(linkData, linkData[0].link, ex);
  }
}

export default {
  settingTest,
  currentSectionCard,
};
