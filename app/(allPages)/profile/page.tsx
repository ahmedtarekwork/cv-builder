// nextjs
import Link from "next/link";

// components
import OldCVs from "./components/OldCVs";
// shadcn
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <main className="container pb-4">
      <Button asChild className="w-full">
        <Link href="/cv-form">+ Make New CV</Link>
      </Button>

      <OldCVs />
    </main>
  );
};
export default ProfilePage;
