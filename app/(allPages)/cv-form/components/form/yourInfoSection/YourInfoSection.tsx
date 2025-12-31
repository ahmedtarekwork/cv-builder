// types
import type { FormChildrensProps } from "../../../page";

// sections
import PersonalInfo from "./sections/PersonalInfo";
import ContactInfo from "./sections/ContactInfo";
import Profiles from "./sections/Profiles";
import SummaryAndEducation from "./sections/SummaryAndEducation";

const sections = [PersonalInfo, ContactInfo, Profiles, SummaryAndEducation];

const YourInfoSection = ({ register, errors }: FormChildrensProps) => {
  return (
    <>
      <h2 className="title mb-4">Your Info</h2>

      {sections.map((Section, i) => (
        <Section register={register} errors={errors} key={i} />
      ))}
    </>
  );
};
export default YourInfoSection;
