// components
import HomePageBtn from "../components/HomePageBtn";
import GlitchCards from "@/components/GlitchCards";

// react bits library
import GradientText from "@/components/react bits library/GradientText";
import RotatingText from "@/components/react bits library/RotatingText";

const Landing = () => {
  return (
    <div
      id="home"
      className="flex max-lg:gap-5 gap-2 pt-6 flex-wrap min-h-screen max-lg:flex-col"
    >
      <div className="lg:flex-[0.5] space-y-6">
        <h1>
          <GradientText
            colors={[
              "#07553b",
              "#109820",
              "#25ee3c",
              "#0fa",
              "#075510",
              "#07553b",
            ]}
            className="text-5xl max-lg:mt-4 max-[500px]:text-3xl max-[300px]:text-2xl max-lg:text-center"
            animationSpeed={4}
          >
            Stand out with a professionally designed resume
          </GradientText>
        </h1>

        <div className="overflow-hidden pt-4">
          <RotatingText
            className="font-semibold text-slate-700"
            texts={[
              "By employing the best practices and innovative tech, Resume Builder boosts your chances of landing a better job - completely for free.",
              "By employing the best practices and innovative tech, Resume Builder boosts your chances of landing a better job - completely for free.",
            ]}
            splitBy="words"
            rotationInterval={3500}
            staggerDuration={0.015}
          />
        </div>

        <span className="block w-fit mx-auto">
          <HomePageBtn />
        </span>
      </div>
      <div className="lg:flex-[0.5] flex justify-center">
        <GlitchCards />
      </div>
    </div>
  );
};
export default Landing;
