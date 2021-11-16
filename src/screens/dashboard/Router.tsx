import React, { useState, useEffect, useContext } from "react";
import DashboardNavigation from "./DashNav";
import CurrentUserContext from "../../context/userContext";
import { Redirect, Switch, Route } from "react-router";
import Messages from './Messages';
import Conversation from './Conversation';
import Friends from './Friends';
import Profile from './Profile';
import NotFound from "./NotFound";

export default () => {
    const CurrentUser = useContext(CurrentUserContext);
    if (CurrentUser && CurrentUser.token === null) return <Redirect to="/authentication"></Redirect>

    return (
        <div className="dashboard-container">
            {/* <div className="dashboard-texture"></div> */}
            {/* Dashboard navigation */}
            <DashboardNavigation />
            <div className="dashboard-content">
                <Switch>
                    {/* Route to messages */}
                    <Route exact={true} path="/dashboard/messages">
                        <Messages />
                    </Route>
                    <Route exact={true} path="/dashboard/messages/:id">
                        <Conversation />
                    </Route>
                    <Route exact={true} path="/dashboard/friends">
                        <Friends />
                    </Route>
                    <Route exact={true} path="/dashboard/profile">
                        <Profile />
                    </Route>
                    <Route exact={true} path="/dashboard">
                        <Redirect to="/dashboard/messages" />
                    </Route>
                    <Route exact={true} path="/*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}