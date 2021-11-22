import axios from "axios";
import APIURL from "../environment/urlSwitch";
import { toast } from 'react-toastify';

interface SignupFormDetails {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default async (e:any, formDetails: SignupFormDetails, setUserFunc: any) => {
    e.preventDefault();
    let username = formDetails.username.trim();
    let email = formDetails.email.trim();
    let password = formDetails.password.trim();
    let confirmPassword = formDetails.confirmPassword.trim();
    
    if (username === "" ||  email === "" || password === "" || confirmPassword === "") {
        return toast.error("Please ensure all fields are filled in!")
    }

    if (password !== confirmPassword) {
        return toast.error("Please make sure your passwords match!")
    }

    let request = await axios.post(
        `${APIURL}/user/create`,
        { username, email, password },
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
        toast.success("Successfully signed up!");
        localStorage.setItem('token', data.sessionToken);
        setTimeout(() => {
            setUserFunc(loggedInUser);
        }, 300)
    } else {
        toast.error(data.message)
    }
}