// import axios from "axios";
// import APIURL from "../environment/apirouter";
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

    // let request = await axios.post(
        // URL
        // `${APIURL}/user/signin`, 
        // BODY
        // { email, password },
        // HEADERS
    //     {
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }
    // );
    // request = request.data
    // let user = request.user
    
    // If error return error
    // toast.error("An error occurred, " + err.message)

    toast.success("Welcome to Tellem!");
    setTimeout(() => {
        // Set token
        // setUser(user)
    }, 500)
}