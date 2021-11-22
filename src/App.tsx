import './styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import Authentication from "./screens/Authentication/Authentication";
import UserContext from './context/userContext';
import UserUpdateContext from './context/UserUpdateContext';
import DashboardRouter from './screens/dashboard/Router';
import LoggedInUser from './interfaces/authUser';
import checktoken from './helpers/authentication/checktoken';

export default withRouter(() => {
  // Authorized user for react context
  const [CurrentUser, setCurrentUser] = useState<LoggedInUser>({
      username: "",
      email: "",
      uuid: "",
      backgroundColor: "",
      token: null,
      idCode: null
  });

  if (localStorage.getItem('token') !== null && !CurrentUser.token) {
    checktoken(setCurrentUser);
  }

  return (
      <UserContext.Provider value={CurrentUser}>
        <UserUpdateContext.Provider value={setCurrentUser}>
          <div className="app">
            <Switch>
              <Route path="/authentication">
                <Authentication  />
              </Route>
              <Route path="/dashboard">
                <DashboardRouter />
              </Route>
              <Route 
                path="/*" 
                render={() => CurrentUser.token !== null ? <Redirect to="/dashboard" /> : <Redirect to="/authentication" /> }
              />
            </Switch>
            {/* Notification container */}
            <ToastContainer 
              position="bottom-center"
              closeButton={false}
              hideProgressBar={true}
              draggable={false}
              transition={Zoom}
              limit={1}
              autoClose={3000}
            />
          </div>
        </UserUpdateContext.Provider>
      </UserContext.Provider>
  )
})