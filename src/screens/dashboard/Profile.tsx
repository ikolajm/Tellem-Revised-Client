import { useContext, useState } from "react"
import UserContext from "../../context/userContext"
import getPreferredColor from "../../helpers/dashboard/getColor";
import AuthInput from "../../reusable_components/form/Auth_Input";
import {toast} from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import EditPassword from '../dashboard/modals/EditPassword';

export default () => {
    const CurrentUser = useContext(UserContext);
    const [preferredColor, setPreferredColor] = useState(CurrentUser?.profileBackground!);
    const [idCode, setIdCode] = useState(CurrentUser?.idCode!)
    const [username, setUsername] = useState(CurrentUser?.username!);
    const [email, setEmail] = useState(CurrentUser?.email!);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [show, setShow] = useState(false);

    const checkColorSelection = (color:string) => {
        if(color === preferredColor) {
            return `color-option ${color} selected`;
        } else {
            return `color-option ${color}`;
        }
    }

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        }, 300);
    }

    const openEditModal = (e: any) => {
        e.preventDefault();
        setShow(true);
    }

    return (
        <div className="profile-container">
            <div className="profile">
                <div className="head">
                    <h1>My Profile</h1>
                </div>
                <div className="profile-preview">
                    {/* Avatar */}
                    {/* Avatar and name */}
                    <div className="identifier">
                        <div style={getPreferredColor(preferredColor)} className="avatar">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="two-tier">
                            <span className="idCode">
                                #{idCode}
                            </span>
                            <span className="name">
                                {username}
                            </span>
                        </div>
                    </div>
                </div>
                <form className="profile-edit">
                    <div className="head">
                        <h1>Edit Profile</h1>
                    </div>
                    <div className="inputs">
                        <div className="inline-field">
                            {/* Username */}
                            <AuthInput 
                                forId="username"
                                incomingFor="username"
                                handleChange={setUsername}
                                label="Username"
                                type="text"
                                value={username}
                            />
                            {/* Identifier */}
                            <AuthInput 
                                forId="idCode"
                                incomingFor="idCode"
                                handleChange={setIdCode}
                                label="ID Code"
                                type="number"
                                value={idCode}
                            />
                        </div>
                        {/* Email */}
                        <AuthInput 
                            forId="email"
                            incomingFor="email"
                            handleChange={setEmail}
                            label="Email"
                            type="email"
                            value={email}
                        />
                        {/* Preferred background */}
                        <div className="preferred-background">
                            <label htmlFor="">Preferred Color:</label>
                            <div className="color-row">
                                <div onClick={() => setPreferredColor('red')} className={checkColorSelection('red')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('blue')} className={checkColorSelection('blue')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('green')} className={checkColorSelection('green')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('orange')} className={checkColorSelection('orange')}>
                                    <i className="fas fa-check"></i>
                                </div>
                            </div>
                            <div className="color-row">
                                <div onClick={() => setPreferredColor('darkslategrey')} className={checkColorSelection('darkslategrey')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('purple')} className={checkColorSelection('purple')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('pink')} className={checkColorSelection('pink')}>
                                    <i className="fas fa-check"></i>
                                </div>
                                <div onClick={() => setPreferredColor('brown')} className={checkColorSelection('brown')}>
                                    <i className="fas fa-check"></i>
                                </div>
                            </div>
                        </div>
                        {/* Edit password button */}
                        <div className="edit-password">
                            <button onClick={(e) => openEditModal(e)}>Edit Password</button>
                        </div>
                    </div>
                </form>

                {/* Save prompt */}
                <div className="save-prompt">
                    <span>Don't forget to save your changes!</span>
                    <button>Save Changes</button>
                </div>
            </div>

            {/* Edit password modal */}
            <EditPassword 
                show={show}
                handleClose={() => handleClose()}
                password={password}
                newPassword={newPassword}
                confirmNewPassword={confirmNewPassword}
                setPassword={setPassword}
                setNewPassword={setNewPassword}
                setConfirmNewPassword={setConfirmNewPassword}
            />
        </div>
    )
}