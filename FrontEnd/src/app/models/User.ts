export class User {
    userID: number;
    username: string;
    userPassword: string;
    userEmail: string;

    constructor(userID: number, username: string, userPassword: string, userEmail: string) {
        this.userID = userID;
        this.username = username;
        this.userPassword = userPassword;

        this.userEmail = userEmail;
    }

    static of(username: string, password?: string, email?: string) {
        return new User(0, 
            username, 
            password == null ? '' : password,
            email == null ? '' : email
            );
    }
}