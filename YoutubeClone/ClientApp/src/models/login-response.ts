import UserSummary from "./user-summary";

export default interface LoginResponse {
    user: UserSummary;
    token: string;
}