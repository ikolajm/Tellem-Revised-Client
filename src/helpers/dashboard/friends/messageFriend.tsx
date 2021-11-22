import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, friendIds: any, content: string) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    if (content.trim() === "") {
        return toast.error('Please make sure the message field is filled in')
    }

    console.log(friendIds,  content)
    let conversation: any = await axios.post(
        `${APIURL}/conversation/create`,
        {
            friendIds,
            content
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    console.log(conversation)
    conversation = conversation.data;
    console.log(conversation)
    if (conversation.status === "SUCCESS") {
        toast.success('Message sent!')
        console.log(conversation.conversationId);
        return conversation;
    } else {
        toast.error(`${conversation.err}`)
    }
}