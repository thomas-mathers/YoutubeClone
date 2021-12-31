import { createContext } from "react";
import { AuthService } from "./auth-service";

const AuthServiceContext = createContext<AuthService>({} as AuthService);

export { AuthServiceContext }