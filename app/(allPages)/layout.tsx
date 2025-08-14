// react
import type { ReactNode } from "react";

// components
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";

// utils
import { Toaster } from "sonner";

// context
import UserContext from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <UserContext>
      <Header />
      <main className="container py-4 flex-1 flex flex-col">{children}</main>
      <Toaster richColors />
      <Footer />
    </UserContext>
  );
}
