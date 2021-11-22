import axios from "axios";
import APIURL from "../environment/urlSwitch";
import { toast } from 'react-toastify';
import LoggedInUser from "../../interfaces/authUser"

interface LoginFormDetails {
    email: string,
    password: string
}

export default async (e:any, formDetails: LoginFormDetails, setUserFunc: any) => {
    e.preventDefault();
    let email = formDetails.email.trim();
    let password = formDetails.password.trim();
    
    if (email === "" || password === "") {
        return toast.error("Please ensure both fields are filled in!")
    }

    let request = await axios.post(
        `${APIURL}/user/login`,
        { email, password },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    let data = request.data;
    
    if (data && data.user) {
        let loggedInUser = data.user;
        loggedInUser.token = data.sessionToken;
        toast.success("Successfully logged in!");
        localStorage.setItem('token', data.sessionToken);
        setTimeout(() => {
            setUserFunc(loggedInUser);
        }, 300)
    } else {
        toast.error(data.message)
    }
}