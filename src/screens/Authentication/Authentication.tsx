import React, { useState, useContext } from "react";
import AuthInput from "../../reusable_components/form/Auth_Input";
import login from "../../helpers/authentication/login";
import signup from "../../helpers/authentication/signup";
import UserUpdateContext from "../../context/UserUpdateContext";
import UserContext from "../../context/userContext";
import { Redirect } from "react-router";

export default () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const setUserFunc = useContext(UserUpdateContext);
    const CurrentUser = useContext(UserContext);
    if (CurrentUser && CurrentUser.token !== null) return <Redirect to="/dashboard/messages"></Redirect>

    const toggleView = (e: any, str: string) => {
        e.preventDefault();
        const photo: any = document.querySelector(".authentication-text");
        const photoOverlay: any = document.querySelector("#photoOverlay");
        const login: any = document.querySelector("#login");
        const signup: any = document.querySelector("#signup");
        const signupFirst: any = document.querySelector('#signupFirstName');
        const loginEmail: any = document.querySelector('#loginEmail');
        if (str === "LOGIN") {
            if (photo.classList.contains("authentication-text--right")) {
                photo.classList.remove("authentication-text--right");
                photoOverlay.classList.remove("authentication-text--right");
                login.classList.add("showLogin");
                signup.classList.add("hideSignup");
                loginEmail?.focus()
            }
        } else {
            if (!photo.classList.contains("authentication-text--right")) {
                photo.classList.add("authentication-text--right")
                photoOverlay.classList.add("authentication-text--right")
                login.classList.remove("showLogin");
                signup.classList.remove("hideSignup");
                signupFirst?.focus();
            }
        }
    }
    
    return (
            <section className="authentication">
                <div className="authentication-texture"></div>
                <div className="authentication-content">

                    <article className="authentication-text">
                        <div id="photoOverlay" className="overlay"></div>
                        <div className="text">
                            <p>A simple text app where you</p>
                            <h1>Tellem</h1>
                            <p>What's up!</p>
                        </div>
                    </article>

                    <article className="form-container">

                            <form id="login" className="login">
                                <h2>Welcome back!</h2>
                                <AuthInput
                                    forId="loginEmail"
                                    incomingFor="loginEmail"
                                    handleChange={setEmail}
                                    label="Email"
                                    type="email"
                                    value={email}
                                />
                                <AuthInput
                                    forId="loginPassword"
                                    incomingFor="loginPassword"
                                    handleChange={setPassword}
                                    label="Password"
                                    type="password"
                                    value={password}
                                />
                                <div className="button-container">
                                    <button type="submit" className="btn btn-primary submitBtn" onClick={(e) => login(
                                        e,
                                        {
                                            email,
                                            password
                                        },
                                        setUserFunc
                                    )
                                    }>Submit</button>
                                    <div className="text-button">
                                        <button onClick={(e) => toggleView(e, "SIGNUP")}>I don't have an account</button>
                                    </div>
                                </div>
                            </form>

                            <form id="signup" className="signup">
                                <h2>Let's get started!</h2>
                                <AuthInput
                                    forId="username"
                                    incomingFor="username"
                                    handleChange={setUsername}
                                    label="Username"
                                    type="text"
                                    value={username}
                                />
                                <AuthInput
                                    forId="signupEmail"
                                    incomingFor="signupEmail"
                                    handleChange={setEmail}
                                    label="Email"
                                    type="email"
                                    value={email}
                                />
                                <AuthInput
                                    forId="signupPassword"
                                    incomingFor="signupPassword"
                                    handleChange={setPassword}
                                    label="Password"
                                    type="password"
                                    value={password}
                                />
                                <AuthInput
                                    forId="signupConfirm"
                                    incomingFor="signupConfirm"
                                    handleChange={setConfirmPassword}
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                />
                                <div className="button-container">
                                    <button type="submit" className="btn btn-primary submitBtn" onClick={e => signup(e, 
                                        {
                                            username,
                                            email,
                                            password,
                                            confirmPassword
                                        },
                                        setUserFunc
                                    )}>Submit</button>
                                    <div className="text-button">
                                        <button onClick={(e) => toggleView(e, "LOGIN")}>I have an account already</button>
                                    </div>
                                </div>
                            </form>

                    </article> {/* END FORM CONTAINER */}
                </div> {/* END AUTHENTICATION CONTENT */}
            </section>
    );
}