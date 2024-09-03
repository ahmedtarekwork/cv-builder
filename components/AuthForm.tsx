"use client";

// nextjs
import Link from "next/link";
import { useRouter } from "next/navigation";
// react
import {
  type FormEvent,
  type RefObject,
  useContext,
  useRef,
  useState,
} from "react";

// components
// shadcn
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// icons
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

// firebase
import { auth } from "../config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// context
import { userContext } from "@/context/UserContext";

type Props = {
  type: "login" | "signup";
};

const initErrorMsgs = {
  email: "",
  password: "",
  name: "",
  authBtns: "",
};

const AuthForm = ({ type }: Props) => {
  const { setUser } = useContext(userContext);
  const router = useRouter();

  const InputsRefs = useRef<
    Record<"email" | "password" | "name", RefObject<HTMLInputElement>>
  >({
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
  });

  const [errors, setErrors] = useState(initErrorMsgs);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const values = Object.fromEntries(
      Object.entries(InputsRefs.current).map(([name, ref]) => [
        name,
        ref.current?.value,
      ])
    ) as Record<"email" | "password" | "name", string>;

    const emptyValues = Object.fromEntries(
      Object.entries(values).filter(([key, val]) => {
        if (type === "login") {
          if (key !== "name") return !val ? { [key]: val } : undefined;
        } else {
          return !val ? { [key]: val } : undefined;
        }
      })
    );

    const lessPasswordWarn = values.password && values.password.length < 6;

    if (Object.keys(emptyValues).length || lessPasswordWarn) {
      setErrors(() => {
        const final = { ...initErrorMsgs };

        Object.keys(emptyValues).forEach(
          (key) => (final[key as keyof typeof final] = `${key} can't be empty`)
        );

        if (lessPasswordWarn) {
          final.password = "password must be 6 characters or more";
        }

        return final;
      });

      return;
    } else setErrors(initErrorMsgs);

    const method = () =>
      type === "login"
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;

    try {
      setIsLoading(true);
      const user = await method()(auth, values.email, values.password);

      if (type === "signup") {
        await updateProfile(user.user, {
          displayName: values.name,
        });
      }

      const { email, uid: id, displayName } = user.user;
      if (email && id) {
        setUser({
          email,
          id,
          displayName: type === "signup" ? values.name : displayName || "",
        });
        router.push("/");
      }
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use": {
          setErrors({ ...initErrorMsgs, email: "email is already taken" });
          break;
        }
        case "auth/invalid-email": {
          setErrors({ ...initErrorMsgs, email: "email is invalid" });
          break;
        }
        case "auth/invalid-credential": {
          setErrors({
            ...initErrorMsgs,
            password: "email or password is invalid",
          });
          break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center container">
      <form
        className="rounded-[15px] the-shadow p-4 space-y-4 w-[500px] max-w-full [&>*]:max-w-screen"
        onSubmit={handleSubmit}
      >
        <h1 className="title capitalize">{type}</h1>

        {type === "signup" && (
          <>
            <Input
              placeholder="name"
              type="text"
              ref={InputsRefs.current.name}
            />
            {errors.name && <p className="text-destructive">{errors.name}</p>}
          </>
        )}

        <Input
          placeholder="email"
          type="email"
          ref={InputsRefs.current.email}
        />
        {errors.email && <p className="text-destructive">{errors.email}</p>}

        <Input
          placeholder="password"
          type="password"
          ref={InputsRefs.current.password}
        />
        {errors.password && (
          <p className="text-destructive">{errors.password}</p>
        )}

        <Button
          className="w-full capitalize"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : type}
        </Button>

        <div className="flex flex-col gap-2">
          {/* "or" line */}
          <div className="relative py-4">
            <span className="-z-10 block w-full h-[1px] bg-slate-500" />

            <span className="bg-red block z-10 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-slate-700">
              or
            </span>
          </div>

          <Button
            className="py-6 capitalize"
            type="button"
            onClick={async () => {
              try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
              } catch (error: any) {
                switch (error.code) {
                  case "auth/popup-closed-by-user":
                  case "auth/cancelled-popup-request": {
                    setErrors(initErrorMsgs);
                  }
                }
              }
            }}
          >
            <FaGoogle size={25} className="mr-2" />
            Sign in With Google
          </Button>

          <Button
            className="py-6 capitalize"
            type="button"
            onClick={async () => {
              try {
                const provider = new GithubAuthProvider();
                provider.setCustomParameters({
                  prompt: "select_account",
                });
                await signInWithPopup(auth, provider);
              } catch (error: any) {
                switch (error.code) {
                  case "auth/account-exists-with-different-credential": {
                    setErrors({
                      ...initErrorMsgs,
                      authBtns:
                        "this email already used for another login method, try sign in with another way",
                    });
                  }
                }
              }
            }}
          >
            <FaGithub size={25} className="mr-2" />
            Sign in With Github
          </Button>

          {errors.authBtns && (
            <p className="text-destructive">{errors.authBtns}</p>
          )}
        </div>

        <p className="text-sm text-center">
          Don’t have an account?
          <Button variant="link" asChild className="p-[2px]">
            <Link href={type === "login" ? "signup" : "login"}>
              {type === "login" ? "signup" : "login"}
            </Link>
          </Button>
        </p>
      </form>
    </main>
  );
};
export default AuthForm;
