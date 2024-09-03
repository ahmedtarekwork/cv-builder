"use client";

// nextjs
import { usePathname, useRouter } from "next/navigation";

// react
import {
  useState,
  useEffect,
  createContext,

  // types
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

// firebase
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

type UserType = Record<"email" | "displayName" | "id", string> | null;

export const userContext = createContext<{
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}>({ user: null, setUser: () => {} });

const UserContext = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (isLoading) setIsLoading(false);

      if (user) {
        const { email, displayName, uid } = user;

        if (email && displayName) {
          setUser({
            email,
            displayName,
            id: uid,
          });
        }
      } else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (["/login", "/signup"].some((path) => pathname.endsWith(path))) {
          router.push("/");
        }
      } else {
        if (
          ["/login", "/signup", "/"].every((path) => !pathname.endsWith(path))
        ) {
          router.push("/");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pathname, isLoading]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {isLoading ? (
        <body className="min-h-screen flex justify-center items-center">
          <h1 className="text-primary font-bold" style={{ fontSize: 36 }}>
            Loading...
          </h1>
        </body>
      ) : (
        children
      )}
    </userContext.Provider>
  );
};
export default UserContext;
