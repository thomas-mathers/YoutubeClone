import { mapJsonToUserSummary, UserSummary } from "./user-summary";

export interface LoginResponse {
    user: UserSummary;
    token: string;
}

export function mapJsonToLoginResponse(json: any): LoginResponse {
    return {
        user: mapJsonToUserSummary(json.user),
        token: json.token
    }
}