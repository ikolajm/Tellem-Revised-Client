import React from "react";
import LoggedInUser from "../interfaces/authUser";

// Create context
export default React.createContext<LoggedInUser | null>(null);
