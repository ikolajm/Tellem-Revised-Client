import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, messageContent: string, conversationId: number) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let message: any = await axios.post(
        `${APIURL}/message/create`,
        {
            conversationId,
            content: messageContent
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    message = message.data;
    if (message.status === "SUCCESS") {
        return message;
    } else {
        toast.error(`${message.err}`)
    }
}