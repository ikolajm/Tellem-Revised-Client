import React, { useContext } from "react"
import { NavLink } from "react-router-dom";
import logout from '../../helpers/authentication/logout';
import UserUpdateContext from "../../context/UserUpdateContext";

export default () => {
    const setUserFunc = useContext(UserUpdateContext);
    const toggleNav = () => {
        console.log('clicked')
        const nav = document.querySelector('nav');
        nav?.classList.toggle('show');
    }

    window.addEventListener('resize', () => {
        const nav = document.querySelector('nav');
        if (window.innerWidth < 985) {
            if (nav?.classList.contains('show')) {
                nav?.classList.remove('show');
            }
        }
    })

    return (
        <nav>
            <div className="topNav">
                <h1>Tellem</h1>
                {/* Mobile - Hamburger */}
                <button onClick={() => toggleNav()} className="toggler">
                    <i className="fas fa-exchange-alt"></i>
                </button>
                {/* Messages */}
                <NavLink id="messageRoute" to="/dashboard/messages" activeClassName="active" className="nav-icon">
                    <i className="fas fa-envelope-open-text"></i>
                </NavLink>
                {/* Friends */}
                <NavLink id="friendsRoute" to="/dashboard/friends" activeClassName="active" className="nav-icon">
                    <i className="fas fa-user-friends"></i>
                </NavLink>
                {/* Profile */}
                <NavLink id="profileRoute" to="/dashboard/profile" activeClassName="active" className="nav-icon">
                    <i className="fas fa-id-card"></i>
                </NavLink>
                {/* <button className="nav-icon">
                    <i className="fas fa-id-card"></i>
                </button> */}
            </div>
            {/* Logout */}
            <div className="bottomNav">
                <div tabIndex={0} onClick={() => logout(setUserFunc)} className="nav-icon logout">
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        </nav>
    )
}