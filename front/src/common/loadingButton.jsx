import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import { getCurrentUser } from "../services/authService";
import { toast } from "react-toastify";

export default function LoadingButton({
  upload,
  description,
  name,
  _id,
  createUpload,
  type,
  disabled,
}) {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = async () => {
    try {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
      }
      await createUpload(upload, description, name, _id);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        type === "video"
          ? (window.location = "/video")
          : (window.location = "/photo");
      }, 1000);
    } catch (ex) {
      console.log(ex);
      toast.error("Please Enter Valid Name or Link", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 0 }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
          disabled={disabled ? true : !upload ? true : false}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
      </Box>
    </Box>
  );
}
