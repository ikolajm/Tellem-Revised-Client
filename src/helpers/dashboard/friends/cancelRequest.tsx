import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, request: any) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let cancel: any = await axios.delete(
        `${APIURL}/friend/request/delete/${request.uuid}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    cancel = cancel.data;
    if (cancel.status === "SUCCESS") {
        toast.success('Friend request cancelled')
        // Get the selected item and remove  from the DOM
        return "SUCCESS"
    } else {
        toast.error(`${cancel.err}`)
        return "ERROR" 
    }
}