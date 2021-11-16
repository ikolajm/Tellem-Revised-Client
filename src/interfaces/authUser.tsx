export default interface LoggedInUser {
    username: string;
    email: string;
    uuid: string;
    picture?: string | null;
    profileBackground: string;
    token: string | null;
    idCode: number | null;
};
