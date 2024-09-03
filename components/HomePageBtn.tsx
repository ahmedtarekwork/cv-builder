"use client";

// nextjs
import Link from "next/link";
// react
import { useContext } from "react";

// shadcn
import { Button } from "./ui/button";
// context
import { userContext } from "@/context/UserContext";

const HomePageBtn = () => {
  const { user } = useContext(userContext);

  return (
    <Button asChild>
      <Link href={user ? "/new-cv" : "/login"}>Start Now</Link>
    </Button>
  );
};
export default HomePageBtn;
