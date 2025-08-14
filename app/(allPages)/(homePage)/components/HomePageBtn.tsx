"use client";

// nextjs
import Link from "next/link";
// react
import { ComponentProps, useContext } from "react";

// components

// shadcn
import { Button } from "@/components/ui/button";

// react bits library
import StarBorder from "@/components/react bits library/StarBorder";

// context
import { userContext } from "@/context/UserContext";

type Props = Partial<{
  holderAttr: ComponentProps<"div">;
  btnAttr: ComponentProps<"button">;
}>;

const HomePageBtn = ({ holderAttr, btnAttr }: Props) => {
  const { user } = useContext(userContext);

  return (
    <StarBorder
      color="#22c55e"
      thickness={4}
      speed="1.2s"
      {...holderAttr}
      className={`rounded-[10px] ${holderAttr?.className || ""}`.trim()}
      as="div"
    >
      <Button
        variant="gradient"
        {...btnAttr}
        className={`rounded-[10px] text-xl ${btnAttr?.className || ""}`.trim()}
        asChild
      >
        <Link href={user ? "/cv-form" : "/login"}>Start Now</Link>
      </Button>
    </StarBorder>
  );
};
export default HomePageBtn;
