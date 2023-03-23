import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { getCurrentUser } from "../../services/authService";
import {
  createMessage,
  getMessages,
  something,
} from "../../services/linkService";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import axios from "axios";
import httpServices from "../../services/httpServices";

const Chat = () => {
  const [messages, setMessages] = useState("");
  const [reload, setReload] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  const { userName, _id } = getCurrentUser();

  useEffect(() => {
    async function getMessage() {
      getMessages(_id)
        .then((e) => {
          setDisplayedMessages(e.data);
        })
        .catch((x) => console.log(x));
    }
    getMessage();
  }, [reload]);

  const onMessageChange = (e) => {
    setMessages(e.currentTarget.value);
  };

  const onMessageSent = () => {
    something();
    setReload(!reload);
  };

  console.log(displayedMessages);
  return (
    <div>
      <Box
        sx={{
          height: "40rem",
          width: "60rem",
          margin: "auto",
          border: "2px solid red",
        }}
      >
        {displayedMessages.length === 0
          ? null
          : displayedMessages.map((m) => (
              <div
                style={{
                  height: "4rem",
                  width: "30rem",
                  marginRight: "-29rem",
                  border: "2px solid red",
                }}
                key={m._id}
              >
                {m.text}
              </div>
            ))}
        <Box
          sx={{
            height: "4rem",
            width: "30rem",
            border: "2px solid red",
          }}
        >
          <TextField onChange={onMessageChange}>dsdada</TextField>
          <Box
            sx={{
              height: "4rem",
              width: "4rem",
              marginTop: "-3.6rem",
              marginLeft: "26rem",
              border: "2px solid red",
            }}
          >
            {userName}
          </Box>
          <Box
            sx={{
              height: "4rem",
              width: "4rem",
              border: "2px solid red",
              marginTop: "-4rem",
            }}
          >
            <Button
              sx={{ height: "4rem", width: "4rem" }}
              onClick={onMessageSent}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Chat;
