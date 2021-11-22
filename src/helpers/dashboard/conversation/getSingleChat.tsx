import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, convoId: number) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let conversation: any = await axios.post(
        `${APIURL}/conversation/${convoId.toString()}`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    conversation = conversation.data;
    if (conversation.status === "SUCCESS") {
        console.log(conversation.conversation)
        return conversation.conversation
    } else {
        toast.error(`${conversation.err}`)
    }
}