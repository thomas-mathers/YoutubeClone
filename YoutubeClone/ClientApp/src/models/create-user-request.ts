export default interface CreateUserRequest {
    email: string;
    password: string;
    givenName: string;
    surname: string;
    profilePictureUrl: string;
    phoneNumber: string;
}