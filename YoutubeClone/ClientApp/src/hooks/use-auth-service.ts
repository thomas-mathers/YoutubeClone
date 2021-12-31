import { useContext } from "react";
import { AuthServiceContext } from "../auth-service-context";

export const useAuthService = () => {
    return useContext(AuthServiceContext);
};