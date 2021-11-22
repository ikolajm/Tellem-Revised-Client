import axios from "axios";
import APIURL from "../../environment/urlSwitch";
import { toast } from 'react-toastify';

export default async (CurrentUser: any, password: string, newPassword: string, confirmNewPassword: string) =>{
    if (password.trim() == "" || newPassword.trim() == "" || confirmNewPassword.trim() == "") {
        return toast.error('Please ensure all fields are filled in!');
    }
    if (newPassword.trim().length < 4 || confirmNewPassword.trim().length < 4) {
        return toast.error('Please ensure all fields are filled in!');
    }
    if (newPassword.trim() !== confirmNewPassword.trim()) {
        return toast.error('Please make sure the new passwords match!');
    }

    let request: any = await axios.put(
        `${APIURL}/user/update/${CurrentUser.uuid}/password`,
        {
            password: password.trim(),
            newPassword: newPassword.trim()
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
        toast.success('Password successfully updated!');
    } else {
        toast.error(`${request.err}`);
    }
}

