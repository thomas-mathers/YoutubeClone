import { ReactNode, useState } from "react"
import { LoginResponse } from "../api/models";
import { UserContext } from "./user-context"

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = (props: UserProviderProps) => {
    const { children } = props;

    const [state, setState] = useState<LoginResponse>();

    return (
        <UserContext.Provider value={{ user: state?.user, token: state?.token, handleLogin: setState, handleLogout: () => setState(undefined) }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider }