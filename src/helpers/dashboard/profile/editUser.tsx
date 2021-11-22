import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';
import LoggedInUser from "../../../interfaces/authUser";

export default async (CurrentUser: any, setUserFunc: any, username: string, email: string, idCode: number, preferredColor: string) =>{
    if (username.trim() === "" || email.trim() === "" || idCode.toString().trim() === "" || preferredColor.trim() === "") {
        return toast.error("please ensure ll fields are filled in!")
    }

    if (username.trim().length < 3) {
        return toast.error('Please ensure your username is at least 3 characters')
    }

    if (idCode.toString().length !== 5) {
        return toast.error('Your ID code must be 5 digits')
    }

    let request: any = await axios.put(
        `${APIURL}/user/update/${CurrentUser.uuid}`,
        {
            username: username.trim(),
            email: email.trim(),
            idCode,
            backgroundColor: preferredColor
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    request = request.data;
    if (request.status === "SUCCESS") {
        toast.success('User information successfully updated!')
        let newUser =  request.user;
        newUser.token = CurrentUser.token;
        console.log(newUser);
        setUserFunc(newUser);
    } else {
        toast.error(`${request.err}`)
    }
}

