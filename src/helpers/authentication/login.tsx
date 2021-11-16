// import axios from "axios";
// import APIURL from "../environment/apirouter";
import { toast } from 'react-toastify';
import LoggedInUser from "../../interfaces/authUser"

interface LoginFormDetails {
    email: string,
    password: string
}

export default async (e:any, formDetails: LoginFormDetails, setUserFunc: any) => {
    e.preventDefault()
    let email = formDetails.email.trim();
    let password = formDetails.password.trim();
    
    if (email === "" || password === "") {
        return toast.error("Please ensure both fields are filled in!")
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

    toast.success("Successfully logged in!");
    const sampleUser: LoggedInUser = {
        username: "JakeIkola",
        email: "ikolajm@gmail.com",
        uuid: "a1",
        picture: null,
        profileBackground: "blue",
        token: 'abc123',
        idCode: 12445
    };
    // console.log(sampleUser)
    // const 
    setTimeout(() => {
        // Set user
        setUserFunc(sampleUser);
    }, 500)
}