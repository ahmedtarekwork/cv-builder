// nextjs
import Image from "next/image";

// utils
import { nanoid } from "nanoid";

const featuresList = [
  {
    content: "Personal Details",
    iconPath: "features section icons/person green.svg",
    id: nanoid(),
  },
  {
    content: "Experience",
    iconPath: "features section icons/work-experience.svg",
    id: nanoid(),
  },
  {
    content: "Education",
    iconPath: "features section icons/education.svg",
    id: nanoid(),
  },
  {
    content: "Skills",
    iconPath: "features section icons/skills.svg",
    id: nanoid(),
  },
  {
    content: "Languages",
    iconPath: "features section icons/language.svg",
    id: nanoid(),
  },
  {
    content: "Certificates",
    iconPath: "features section icons/experience.svg",
    id: nanoid(),
  },
  {
    content: "Summary",
    iconPath: "features section icons/summary.svg",
    id: nanoid(),
  },
];

const Features = () => {
  return (
    <div id="features" className="homepage-section">
      <h2 className="title">Our Features</h2>
      <p className="text-slate-700 font-bold mb-8">
        Our platform offers a variety of pre-designed sections to help you build
        a professional and comprehensive CV. You can easily select and add these
        sections to highlight your skills, experience, and achievements,
        creating a polished resume that stands out to recruiters.
      </p>

      <ul id="features-list" className="grid gap-6 justify-center">
        {featuresList.map(({ id, content, iconPath }) => (
          <li key={id} className="glow-border space-y-4 p-3 bg-green-100">
            <Image
              sizes="100%"
              width={100}
              height={100}
              src={iconPath}
              alt={`${content} icon`}
              className="mx-auto max-w-full aspect-[1] object-contain"
            />

            <p className="font-extrabold text-primary text-lg text-center">
              {content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Features;
