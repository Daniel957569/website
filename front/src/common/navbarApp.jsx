import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "./navbarApp.css";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { getUserById, rerendering } from "./../services/linkService";

// const LoggedOutUI = ["links", "videos", "photos", "login", "signup"];
const LoggedInUI = ["link", "video", "photo", "upload", "chat"];
const UIlogInOut = ["login", "signup"];
const settings = ["Account", "Logout"];
let userId;

const NavBarApp = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userImage, setUserImage] = useState("");

  userId = !getCurrentUser() ? "" : ({ _id: userId } = getCurrentUser());

  let numKey = 0;

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        userId = userId["_id"];
        if (!userId) return null;

        const image = await getUserById(userId);

        if (image.data.imageUrl === userImage) return null;
        else if (!image.data.imageUrl) {
          setUserImage("/static/images/avatar/2.jpg");
        } else {
          setUserImage(image.data.imageUrl);
        }
      } catch (ëx) {
        console.log("");
      }
    };
    asyncEffect();
  }, [userImage]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navbarPages = (pagesUI) => {
    return pagesUI.map((page, index) => (
      <Link
        className="page__color"
        to={page === "link" ? "/links" : `/${page}`}
        key={numKey++}
      >
        <Button
          key={numKey++}
          onClick={handleCloseNavMenu}
          sx={{ my: 0, color: "white", display: "block" }}
        >
          <h3>
            {pagesUI === UIlogInOut
              ? UIlogInOut[index]
              : LoggedInUI[index] === "upload"
              ? "upload"
              : LoggedInUI[index] + "S"}
          </h3>
        </Button>
      </Link>
    ));
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "rgba(0, 0, 0, 0.91)", marginBottom: "2rem" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            />
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navbarPages(LoggedInUI)}
          </Box>
          <Box sx={{ flexGrow: 0.2, display: { xs: "none", md: "flex" } }}>
            {getCurrentUser() ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userImage} />
                </IconButton>
              </Tooltip>
            ) : (
              navbarPages(UIlogInOut)
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((s) => (
                <a key={numKey++} href={s} textalign="center">
                  <MenuItem key={numKey++} onClick={handleCloseUserMenu}>
                    {s}
                  </MenuItem>
                </a>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBarApp;
