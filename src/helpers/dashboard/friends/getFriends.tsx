import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let request: any = await axios.get(
        `${APIURL}/friend/all`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    request = request.data;
    if (request.status === "SUCCESS") {
        let friends = request.friends.map((friend: any) => {
            return friend.user
        })
        friends = friends.sort((a: any, b: any) => {
            a = a.username.toUpperCase();
            b = b.username.toUpperCase();
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        })
        return friends;
    } else {
        return toast.error(`${request.err}`)
    }
}