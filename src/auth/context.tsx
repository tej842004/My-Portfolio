import { createContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "../entitles/User";

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>> | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
