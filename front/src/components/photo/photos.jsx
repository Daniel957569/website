import React from "react";
import ListApp from "../../common/list";
import { getImages } from "../../services/linkService";
import Lists from "./../../common/lists";

const Photos = () => {
  return (
    <div>
      <Lists getUpload={getImages} type="img" />
    </div>
  );
};

export default Photos;

// const thirdField = "Photo";
{
  /* <h1>Photos</h1>
<ListApp thirdField={thirdField} formHref="/photos/photosForm" /> */
}
