import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, selectedIds: any, messageContent: string) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    console.log(selectedIds)
    let conversation: any = await axios.post(
        `${APIURL}/conversation/create`,
        {
            friendIds: selectedIds,
            content: messageContent
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    conversation = conversation.data;
    if (conversation.status === "SUCCESS") {
        toast.success('Message sent!')
        return conversation;
    } else {
        toast.error(`${conversation.err}`)
    }
}