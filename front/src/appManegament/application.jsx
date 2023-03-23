import React from "react";
import AppRoutes from "./routes";
import NavBar from "../components/navbar/navbar";

const Application = () => {
  return (
    <React.Fragment>
      <NavBar />
      <AppRoutes />
    </React.Fragment>
  );
};

export default Application;
