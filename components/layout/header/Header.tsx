"use client";

// nextjs
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// react
import { useContext, useEffect, useRef } from "react";

// context
import { userContext } from "@/context/UserContext";

// components
import NavList from "./NavList";

// shadcn
import { Button } from "../../ui/button";

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

  const headerRef = useRef<HTMLElement>(null);

  const isHomePage = pathname === "/";

  const username =
    user?.displayName.split(" ")[0].slice(0, 10) +
    ((user?.displayName.split(" ")[0].length || 0) > 10 ? "..." : "");

  useEffect(() => {
    const header = headerRef.current;

    if (header) {
      const observer = new ResizeObserver(() => {
        const headerHeight = header.offsetHeight;

        document.documentElement.style.setProperty(
          "scroll-padding-top",
          `${headerHeight + 45}px`
        );

        const mainEl = document.querySelector("main");

        if (mainEl) {
          mainEl.style.marginTop = `${headerHeight}px`;
        }
      });

      observer.observe(header);

      return () => observer.disconnect();
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[1000] py-3 the-shadow bg-white"
    >
      <div className="container flex justify-between gap-8 header-container">
        <div className="flex items-center gap-6">
          {isHomePage && (
            <Button
              className="lg:hidden"
              onClick={() =>
                document.getElementById("nav-list")?.classList.toggle("active")
              }
            >
              <Image
                src="bars.svg"
                alt="open nav"
                width={20}
                height={20}
                className="invert"
              />
            </Button>
          )}

          <Link href="/" className="title">
            CV Builder
          </Link>

          {isHomePage && <NavList />}
        </div>

        <div className="flex gap-2 header-name-holder">
          {pathname.includes("profile") ? (
            <p className="font-bold text-primary text-lg min-w-max">
              Hi, {username}
            </p>
          ) : (
            <>
              {!user && (
                <>
                  {!pathname.includes("/login") && (
                    <Button
                      asChild
                      className="flex items-center justify-center gap-2"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                  )}

                  {!pathname.includes("/signup") && (
                    <Button
                      asChild
                      className="flex items-center justify-center gap-2"
                    >
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  )}
                </>
              )}

              {user && (
                <Button
                  asChild
                  className="flex items-center justify-center gap-2"
                >
                  <Link href="/profile">
                    <FaUser />
                    Your Profile
                  </Link>
                </Button>
              )}
            </>
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
