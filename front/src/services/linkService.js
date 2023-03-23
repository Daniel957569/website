import React from "react";
import http from "./httpServices";
import { toast } from "react-toastify";

const urlCurrent = "http://localhost:3001/api/";

export function deleteData(currnetPage, id) {
  return http.delete(`${urlCurrent}${currnetPage}/${id}`);
}
export async function getUserById(id) {
  return await http.get(`${urlCurrent}customers/${id}`);
}
export function getData(kind) {
  return http.get(urlCurrent + kind);
}
export function getDataById(kind, id) {
  return http.get(`${urlCurrent}${kind}/${id}`);
}

// videos

export function deleteVideoBVideoId(id) {
  return http.delete(`${urlCurrent}video/${id}`);
}
export async function getVideoByVideoId(id) {
  return await http.get(`${urlCurrent}video/videoUrl/${id}`);
}
export async function getVideos() {
  return await http.get(`${urlCurrent}video/videos`);
}
export async function getVideoByUserId(id) {
  return await http.get(`${urlCurrent}video/videos/${id}`);
}
export async function createVideo(video, description, name, id) {
  return await http.post(`${urlCurrent}video/videoUrl`, {
    videoUrl: video,
    name,
    description,
    id,
  });
}

export async function updateVideoById(id, name, description) {
  try {
    return await http.put(`${urlCurrent}video/videoUrl`, {
      name,
      description,
      id,
    });
  } catch (error) {
    toast.error("Invalid Video Url Or Wrong Video Section ", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

// images

export function deleteImageByImageId(id) {
  return http.delete(`${urlCurrent}image/${id}`);
}
export async function getImageByUserId(id) {
  return await http.get(`${urlCurrent}image/images/${id}`);
}
export async function getImages() {
  return await http.get(`${urlCurrent}image/image`);
}
export async function getImageByImageId(id) {
  return await http.get(`${urlCurrent}image/imageUrl/${id}`);
}
export async function updateUserImage(id, image) {
  return await http.put(`${urlCurrent}image/imageUrl/${id}`, {
    imageUrl: image,
    id,
  });
}
export async function createImage(image, description, name, id) {
  return await http.post(`${urlCurrent}image/imageUrl`, {
    imageUrl: image,
    name,
    description,
    id,
  });
}
export async function updateImageById(id, name, description) {
  return await http.put(`${urlCurrent}image/imageUrl`, {
    name,
    description,
    id,
  });
}

// chat

export async function createMessage(text, sender, recevier) {
  return await http.post(`${urlCurrent}chat`, {
    text,
    sender,
    recevier,
  });
}

export async function something() {
  return await http.post(`${urlCurrent}chat/something`, { fsdfd: "fsaf" });
}

export async function getMessages(_id) {
  return await http.get(`${urlCurrent}chat/${_id}`);
}
