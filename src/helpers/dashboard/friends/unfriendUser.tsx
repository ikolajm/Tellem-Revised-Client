import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, user: any) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let request: any = await axios.post(
        `${APIURL}/friend/delete`,
        {
            friendUuid: user.uuid,
            friendId:user.id
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
        toast.success('User unfriended')
        // Get the selected item and remove  from the DOM
        return "SUCCESS"
    } else {
        toast.error(`${request.err}`)
        return "ERROR" 
    }
}