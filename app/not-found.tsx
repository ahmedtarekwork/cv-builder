// nextjs
import Image from "next/image";
import Link from "next/link";

// components
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";

// shadcn
import { Button } from "@/components/ui/button";

// contexts
import UserContext from "@/context/UserContext";

const notFound = () => {
  return (
    <UserContext>
      <Header />
      <main className="container py-4 flex-1 flex flex-col">
        <Image
          src="/404.svg"
          alt="not found"
          width={400}
          height={400}
          className="mx-auto max-w-full object-contain aspect-[1]"
        />

        <h1 className="mx-auto text-center my-6 font-bold text-2xl text-primary">
          This Page Not Found !
        </h1>

        <Button asChild className="mx-auto ">
          <Link href="/">Go To Home</Link>
        </Button>
      </main>
      <Footer />
    </UserContext>
  );
};
export default notFound;
