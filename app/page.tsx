// components
import HomePageBtn from "@/components/HomePageBtn";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center flex-col container">
      <h1 className="text-center mb-3 font-semibold landing-text">
        Start making your Professional CV
        <span className="block text-primary">and get your dream job</span>
      </h1>

      <HomePageBtn />
    </main>
  );
}
