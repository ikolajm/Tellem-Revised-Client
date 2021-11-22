import { toast } from 'react-toastify';
import axios from "axios";
import APIURL from "../environment/urlSwitch";

export default async (setUserFunc: any) => {
    // If session is still in place and user refreshes
    let token = localStorage.getItem('token')
    if (token) {
        // Check token
        let request: any = await axios.post(
            `${APIURL}/user/authenticate`,
            {token},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        request = request.data;
        // If auth fails or expires
        if (request.status === "ERROR") {
            sessionStorage.removeItem('token');
            toast.error(request.message)
            return "FAIL";
        } else {
            let user = request.user;
            user.token = token;
            setUserFunc(user);
        }
    }
    // If a protected endpoint is hit but there is no token
    if (!token) {
        return "FAIL"
    }
}