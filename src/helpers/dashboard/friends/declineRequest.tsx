import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, request: any) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let decline: any = await axios.delete(
        `${APIURL}/friend/decline/${request.uuid}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    decline = decline.data;
    if (decline.status === "SUCCESS") {
        toast.success('Friend request declined');
        return "SUCCESS";
    } else {
        toast.error(`${decline.err}`);
        return "ERROR";
    }
}