// nextjs
import Link from "next/link";

// components
import OldCVs from "@/components/OldCVs";
// shadcn
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <main className="container pb-4">
      <Button asChild className="w-full">
        <Link href="/new-cv">Make New CV</Link>
      </Button>

      <OldCVs />
    </main>
  );
};
export default ProfilePage;
