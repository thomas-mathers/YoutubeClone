import { createContext } from "react";
import { LoginResponse, UserSummary } from "../api/models";

export interface UserContextValue {
    user?: UserSummary;
    token?: string;
    handleLogin: (response: LoginResponse) => void;
    handleLogout: () => void;
}

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export { UserContext }