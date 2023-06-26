export class User {
    userID: number;
    username: string;
    userPassword: string;
    firstName: string;
    lastName: string;
    userEmail: string;

    constructor(userID: number, username: string, userPassword: string, firstName: string, lastName: string, userEmail: string) {
        this.userID = userID;
        this.username = username;
        this.userPassword = userPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userEmail = userEmail;
    }

    static of(username: string, password?: string, firstName?: string, lastName?: string, email?: string) {
        return new User(0, 
            username, 
            password == null ? '' : password,
            firstName == null ? '' : firstName,
            lastName == null ? '' : lastName,
            email == null ? '' : email
            );
    }
}