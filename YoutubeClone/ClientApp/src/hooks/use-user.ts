import { useContext } from "react";
import { UserContext } from "../components/user-context";

const useUser = () => useContext(UserContext);

export { useUser }