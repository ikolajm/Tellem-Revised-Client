export default interface LoggedInUser {
    username: string;
    email: string;
    uuid: string;
    backgroundColor: string;
    token: string | null;
    idCode: number | null;
};
