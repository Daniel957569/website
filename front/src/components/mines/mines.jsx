import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { getCurrentUser } from "../../services/authService";
import Avatar from "@mui/material/Avatar";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import {
  getUserImage,
  updateUserImage,
  createVideo,
} from "./../../services/linkService";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import http from "../../services/httpServices";
import axios from "axios";
import Window from "./window";
import { io } from "socket.io-client";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:9000");
const Mines = () => {
  const onClickWindow = () => {
    return <Window />;
  };
  useEffect(() => {
    client.onopen = () => {
      console.log("connected");
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }, []);

  return <div></div>;
};

export default Mines;
