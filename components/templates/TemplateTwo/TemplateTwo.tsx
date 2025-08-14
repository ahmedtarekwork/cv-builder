import type { TemplateDataType } from "@/app/(allPages)/cv-form/page";

import TemplateHolder, { type TheTemplateProps } from "../TemplateHolder";

// icons
import {
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaBehanceSquare,
} from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const TheTemplate = ({
  email,
  jobTitle,
  linkedinLink,
  location,
  name,
  phoneNumber,
  about,
  education,
  jobs,
  projects,
  skills,
  websiteLink,
  BehanceLink,
  githubLink,
}: TemplateDataType) => {
  return (
    <div className="h-full p-2">
      <h1 className="font-bold text-2xl">{name}</h1>
      <p className="text-[12px]">{jobTitle}</p>

      <div className="flex items-center justify-between my-4 flex-wrap gap-2 [&>*]:flex [&>*]:gap-2 [&>*]:items-center">
        <p>
          <FaPhoneAlt size={20} color="black" />
          {phoneNumber}
        </p>
        <p>
          <MdEmail size={20} color="black" />
          {email}
        </p>
        <p>
          <IoLocationSharp size={20} color="black" />
          {location}
        </p>
        {websiteLink && (
          <p>
            <TbWorld size={20} color="black" />
            {websiteLink}
          </p>
        )}
        <p>
          <FaLinkedin size={20} color="black" />
          {linkedinLink}
        </p>
        {githubLink && (
          <p>
            <FaGithub size={20} color="black" />
            {githubLink}
          </p>
        )}
        {BehanceLink && (
          <p>
            <FaBehanceSquare size={20} color="black" />
            {BehanceLink}
          </p>
        )}
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto">
          About Me
        </h2>
        <p className="text-left my-4">{about}</p>
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto mb-1">
          Education
        </h2>
        <p className="text-left my-4">{education}</p>
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto">
          Experience
        </h2>
        <ul className="my-4 text-left">
          {jobs.map(({ job }, i) => (
            <li key={i}>{job}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto">
          Skills
        </h2>
        <ul className="mt-2 text-left">
          {skills.map(({ skill }, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto">
          Projects
        </h2>
        <ul className="mt-2 text-left space-y-4">
          {projects.map(({ name, description }, i) => (
            <li key={i}>
              <h3 className="font-bold text-slate-900">{name}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Dummy = () => {
  return (
    <div className="h-full p-2 w-full">
      <div className="h-3 w-1/2 bg-slate-600 mx-auto" />
      <div className="h-1 w-4 bg-slate-600 mx-auto mt-1" />
      <div className="flex justify-between items-center">
        <div className="h-1 w-10 bg-slate-600" />
        <div className="h-1 w-10 bg-slate-600" />
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-3 w-14 bg-slate-600 mx-auto" />
        <div className="h-1 w-full bg-slate-600" />
        <div className="h-1 w-[90%] bg-slate-600" />
        <div className="h-1 w-[75%] bg-slate-600" />
        <div className="h-1 w-[60%] bg-slate-600" />
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-3 w-14 bg-slate-600 mx-auto" />
        <div className="h-1 w-full bg-slate-600" />
        <div className="h-1 w-[90%] bg-slate-600" />
        <div className="h-1 w-[75%] bg-slate-600" />
        <div className="h-1 w-[60%] bg-slate-600" />
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-3 w-14 bg-slate-600 mx-auto" />
        <div className="h-1 w-full bg-slate-600" />
        <div className="h-1 w-[90%] bg-slate-600" />
        <div className="h-1 w-[75%] bg-slate-600" />
        <div className="h-1 w-[60%] bg-slate-600" />
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-3 w-14 bg-slate-600 mx-auto" />
        <div className="h-1 w-full bg-slate-600" />
        <div className="h-1 w-[90%] bg-slate-600" />
        <div className="h-1 w-[75%] bg-slate-600" />
        <div className="h-1 w-[60%] bg-slate-600" />
      </div>
    </div>
  );
};

const TemplateTwo = ({
  dummy = true,
  templateData,
  turnDummyInSmallScreens,
}: TheTemplateProps) => {
  return (
    <TemplateHolder
      dummy={{
        value: dummy,
        DummyComponent: <Dummy />,
      }}
      templateData={templateData}
      Template={TheTemplate}
      turnDummyInSmallScreens={turnDummyInSmallScreens}
    />
  );
};
export default TemplateTwo;
