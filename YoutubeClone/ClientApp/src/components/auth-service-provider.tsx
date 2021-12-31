import { useCallback, ReactNode } from "react";
import { UserSummary } from "../api/models";
import { AuthServiceContext } from "../auth-service-context";
import useLocalStorage from "../hooks/use-local-storage";

interface UserProviderProps {
    children: ReactNode;
}

const AuthServiceProvider = (props: UserProviderProps) => {
    const { children } = props;

    const [user, setUser] = useLocalStorage<UserSummary | null>(null, 'user');
    const [token, setToken] = useLocalStorage<string | null>(null, 'token');

    const login = useCallback((u: UserSummary, t: string) => {
        setUser(u);
        setToken(t);
    }, [setUser, setToken]);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
    }, [setUser, setToken]);

    const value = { token: token, user: user, login: login, logout: logout };

    return <AuthServiceContext.Provider value={value}>{children}</AuthServiceContext.Provider>
}

export default AuthServiceProvider;