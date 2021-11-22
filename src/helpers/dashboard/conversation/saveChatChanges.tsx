import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, id: number, name: string, backgroundColor: string, conversationDetails: any) =>{
    // let {name, backgroundColor} = conversation;
    if (backgroundColor.trim() === "") {
        return toast.error("please ensure background field is filled in!")
    }

    let request: any = await axios.put(
        `${APIURL}/conversation/update/${id.toString()}`,
        {
            name: name.trim(),
            backgroundColor,
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    request = request.data;
    if (request.status === "SUCCESS") {
        toast.success('Chat details successfully updated!')
        let newConvo = request.editedConversation;
        let returnObj = {...conversationDetails};
        returnObj.name = newConvo.name;
        returnObj.backgroundColor = newConvo.backgroundColor;
        return returnObj;
    } else {
        toast.error(`${request.err}`)
    }
}