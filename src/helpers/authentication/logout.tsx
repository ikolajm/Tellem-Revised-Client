import { tokenToString } from "typescript";
import LoggedInUser from "../../interfaces/authUser";

export default (setUserFunc: any) => {
    const nullUser: LoggedInUser = {
        username: "",
        email: "",
        uuid: "",
        backgroundColor: "",
        token: null,
        idCode: null
    }
    localStorage.removeItem('token');
    setUserFunc(nullUser);
}