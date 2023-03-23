import React from "react";
import NavBarApp from "../../common/navbarApp";

const NavBar = () => {
  const appPages = ["Links", "Videos", "Photos"];
  const appSettings = ["Account", "Logout"];

  return (
    <div>
      <NavBarApp pages={appPages} settings={appSettings} />
    </div>
  );
};

export default NavBar;
