import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, userUuid: string, userId: number) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let search: any = await axios.post(
        `${APIURL}/friend/create/${userUuid}`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    search = search.data;
    console.log(search)
    if (search.status === "SUCCESS") {
        toast.success("Friend request sent")
        return "SUCCESS"
    } else {
        toast.error(`${search.err}`)
    }
}