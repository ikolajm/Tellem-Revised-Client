import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, conversationId: number, userIds: any) =>{
    let request: any = await axios.post(
        `${APIURL}/conversation/add-user/${conversationId.toString()}`,
        {
            userIds
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
        if(request.users.length > 1){
            toast.success('Users added successfully!')
        } else {
            toast.success('User added successfully!')
        }
        return request
    } else {
        toast.error(`${request.err}`)
    }
}