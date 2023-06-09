import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { auth } from "../../lib/firebase";
import { CircularProgress } from "@mui/material";

type AuthContextProps = {
  currentUser: User | null | undefined;
};

type AuthType = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthProvider = ({ children }: AuthType) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="w-[100%] h-[100vh] flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
