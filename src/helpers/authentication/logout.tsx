import LoggedInUser from "../../interfaces/authUser";

export default (setUserFunc: any) => {
    console.log('fired the logout function')
    console.log(setUserFunc)
    const nullUser: LoggedInUser = {
        username: "",
        email: "",
        uuid: "",
        picture: null,
        profileBackground: "",
        token: null,
        idCode: null
    }
    setUserFunc(nullUser);
}