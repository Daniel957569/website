import React, { useState, useEffect } from "react";
import Lists from "../../common/lists";
import { getVideos } from "../../services/linkService";
const Videos = () => {
  return (
    <div>
      <Lists getUpload={getVideos} type="video" />
    </div>
  );
};

export default Videos;
