import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ImageKitUpload from "./../common/imageKitUpload";

import {
  Links,
  Chat,
  Photos,
  Videos,
  Welcome,
  Account,
  Forms,
  Login,
  SignUp,
  Mines,
  Logout,
  PhotosWatch,
  Edit,
  TweetsForm,
  VideoWatch,
} from "../components/index";

const urls = ["video", "photo"];
const formUrl = urls.map((u) => (
  <Route exact key={u} path={`/${u}/${u}sForm`} component={ImageKitUpload} />
));

export function getUrl() {
  return formUrl;
}

const AppRoutes = () => {
  return (
    <React.Fragment>
      <ToastContainer />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/links" component={Links} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/mines" component={Mines} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Logout" component={Logout} />
          <Route exact path="/video" component={Videos} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/upload" component={TweetsForm} />
          <Route exact path="/videoWatch/:id" component={VideoWatch} />
          <Route exact path="/photoWatch/:id" component={PhotosWatch} />
          <Route exact path="/video/edit/:id" component={Edit} />
          <Route exact path="/photo/edit/:id" component={Edit} />
          <Route exact path="/photo" component={Photos} />
          <Route exact path="/account" component={Account} />
          <Route exact path={`/links/linksForm`} component={Forms} />
          {formUrl}
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default AppRoutes;
