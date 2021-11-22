import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, chatId: number) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let unarchive: any = await axios.delete(
        `${APIURL}/conversation/unarchive/${chatId.toString()}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    unarchive = unarchive.data;
    if (unarchive.status === "SUCCESS") {
        toast.success("Chat successfully unarchived");
        return "SUCCESS"
    } else {
        toast.error(`${unarchive.err}`)
    }
}