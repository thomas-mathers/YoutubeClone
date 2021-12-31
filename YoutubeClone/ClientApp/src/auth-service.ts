import { UserSummary } from "./api/models";

interface AuthService {
    user: UserSummary | null;
    token: string | null;
    login: (user: UserSummary, token: string) => void;
    logout: () => void;
}

export type { AuthService }