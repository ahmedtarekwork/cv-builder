// sections
import Landing from "./sections/Landing";
import Features from "./sections/Features";
import AvailableTemplates from "./sections/AvailableTemplates";
import SuggestFeature from "./sections/SuggestFeature";

export default function Home() {
  return (
    <>
      <Landing />
      <Features />
      <AvailableTemplates />
      <SuggestFeature />
    </>
  );
}
