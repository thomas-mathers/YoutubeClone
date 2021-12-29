export interface UserSummary {
    id: string;
    userName: string;
    email: string;
    givenName: string;
    surname: string;
    profilePictureUrl: string;
    phoneNumber: string;
    dateCreated: Date;
}

export function mapJsonToUserSummary(json: any): UserSummary {
    return {
        id: json.id,
        userName: json.userName,
        email: json.email,
        givenName: json.givenName,
        surname: json.surname,
        profilePictureUrl: json.profilePictureUrl,
        phoneNumber: json.phoneNumber,
        dateCreated: json.dateCreated
    }
}