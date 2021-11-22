import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, request: any) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let accept: any = await axios.post(
        `${APIURL}/friend/accept/${request.uuid}`,
        {
            friendUuid: request.user.uuid,
            friendId: request.user.id
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    accept = accept.data;
    if (accept.status === "SUCCESS") {
        toast.success('Friend request accepted');
        return "SUCCESS";
    } else {
        toast.error(`${accept.err}`);
        return "ERROR";
    }
}