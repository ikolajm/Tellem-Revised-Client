import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let conversations: any = await axios.get(
        `${APIURL}/conversation/all`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    conversations = conversations.data;
    if (conversations.status === "SUCCESS") {
        return conversations.conversations
    } else {
        toast.error(`${conversations.err}`)
    }
}