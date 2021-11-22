import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, chatId: number) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let archive: any = await axios.post(
        `${APIURL}/conversation/archive/${chatId.toString()}`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    archive = archive.data;
    if (archive.status === "SUCCESS") {
        toast.success("Chat successfully archived");
        return "SUCCESS"
    } else {
        toast.error(`${archive.err}`)
    }
}