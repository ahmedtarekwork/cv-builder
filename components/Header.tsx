"use client";

// nextjs
import Link from "next/link";
import { usePathname } from "next/navigation";

// react
import { useContext } from "react";

// context
import { userContext } from "@/context/UserContext";

// components
import { Button } from "./ui/button";

// icons
import { FaUser } from "react-icons/fa";

// firebase
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

// utils
import { toast } from "sonner";

const Header = () => {
  const { user } = useContext(userContext);
  const pathname = usePathname();

  if (["login", "signup"].some((path) => pathname.includes(path))) return null;

  return (
    <header className="py-3 the-shadow">
      <div className="container flex justify-between gap-8 header-container">
        <Link href="/" className="title">
          CV Builder
        </Link>

        <div className="flex gap-2 header-name-holder">
          {pathname.includes("profile") ? (
            <p className="font-bold text-primary text-lg min-w-max">
              Hi,{" "}
              {user?.displayName.split(" ")[0].slice(0, 10) +
                ((user?.displayName.split(" ")[0].length || 0) > 10
                  ? "..."
                  : "")}
            </p>
          ) : (
            <Button asChild>
              <Link href={user ? "/profile" : "/login"}>
                {user ? (
                  <>
                    <FaUser />
                    Your Profile
                  </>
                ) : (
                  "Login"
                )}
              </Link>
            </Button>
          )}

          {user && (
            <Button
              onClick={async (e) => {
                try {
                  e.currentTarget.disabled = true;
                  await signOut(auth);
                } catch (error) {
                  e.currentTarget.disabled = false;
                  toast.error("can't logout at the momment");
                }
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
