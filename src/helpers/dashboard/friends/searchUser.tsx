import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, query: string) => {
    if (!CurrentUser.uuid) {
        return toast.error('Unable to perform server queries at this time, please logout and try again')
    }

    let search: any = await axios.post(
        `${APIURL}/user/search`,
        {
            search: query
        },
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
        let { searchResults, pending, friendIds } = search;
        return {
            searchResults,
            pending, 
            friendIds
        }
    } else {
        toast.error(`${search.err}`)
    }
}