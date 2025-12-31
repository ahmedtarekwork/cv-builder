// components
import TemplateHolder, { type TheTemplateProps } from "../TemplateHolder";

// types
import type { TemplateDataType } from "@/app/(allPages)/cv-form/page";

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
  about,
  education,
  email,
  jobTitle,
  jobs,
  linkedinLink,
  location,
  name,
  phoneNumber,
  projects,
  skills,
  websiteLink,
  BehanceLink,
  githubLink,
}: TemplateDataType) => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-between gap-4 items-center p-2 bg-rose-100">
        <div>
          <h1 className="font-bold text-2xl">{name}</h1>
          <p className="text-[12px]">{jobTitle}</p>
        </div>

        <div className="text-left space-y-2 [&>*]:flex [&>*]:gap-2 [&>*]:items-center">
          <p>
            <MdEmail color="black" size={20} />
            {email}
          </p>
          <p>
            <FaPhoneAlt color="black" size={20} />
            {phoneNumber}
          </p>
          <p>
            <IoLocationSharp color="black" size={20} />
            {location}
          </p>
          <p>
            <FaLinkedin color="black" size={20} />
            {linkedinLink}
          </p>
          {websiteLink && (
            <p>
              <TbWorld color="black" size={20} />
              {websiteLink}
            </p>
          )}
          {githubLink && (
            <p>
              <FaGithub color="black" size={20} />
              {githubLink}
            </p>
          )}
          {BehanceLink && (
            <p>
              <FaBehanceSquare color="black" size={20} />
              {BehanceLink}
            </p>
          )}
        </div>
      </div>

      <div className="p-2">
        <div>
          <h2 className="font-bold text-2xl">About Me</h2>
          <p>{about}</p>
        </div>

        <div className="flex gap-6 py-3">
          <div
            className={
              projects.length ? "border-r-2 border-slate-600 pr-4" : ""
            }
          >
            <div className="py-2">
              <h3 className="font-bold text-slate-600 text-2xl border-b w-fit mx-auto border-b-1 border-slate-800 my-2">
                Education
              </h3>
              <p>{education}</p>
            </div>

            {!!jobs.length && (
              <div className="py-2">
                <h3 className="font-bold text-slate-600 text-2xl border-b w-fit mx-auto border-b-1 border-slate-800">
                  Experience
                </h3>
                <ul className="text-left my-2 space-y-1">
                  {jobs.map(({ job }, i) => (
                    <li key={i}>- {job}</li>
                  ))}
                </ul>
              </div>
            )}

            {!!skills?.length && (
              <div className="py-2">
                <h3 className="font-bold text-slate-600 text-2xl border-b w-fit mx-auto border-b-1 border-slate-800">
                  Skills
                </h3>
                <ul className="mt-2 space-y-2 text-left">
                  {skills.map(({ skill }, i) => (
                    <li key={i}>- {skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {!!projects.length && (
            <div>
              <div className="py-2">
                <h3 className="font-bold mb-2 text-slate-600 text-2xl border-b w-fit mx-auto border-b-1 border-slate-800">
                  Projects
                </h3>
                <ul className="space-y-4 text-left">
                  {projects.map(({ name, description }, i) => (
                    <li key={i}>
                      <h4 className="font-bold text-slate-800">- {name}</h4>
                      <p>{description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dummy = () => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-between w-full bg-rose-100 p-2 border-b-4 border-slate-600">
        <div className="basis-1/2 space-y-2">
          <div className="bg-slate-600 h-5 w-[80%]" />
          <div className="bg-slate-600 h-2 w-[60%]" />
        </div>

        <div className="basis-1/2 space-y-3">
          <div className="bg-slate-600 h-2 w-[60%] ml-auto" />
          <div className="bg-slate-600 h-2 w-[80%] ml-auto" />
          <div className="bg-slate-600 h-2 w-[93%] ml-auto" />
        </div>
      </div>

      <div className="p-2">
        <div className="space-y-3">
          <div className="h-5 w-1/2 bg-slate-600 mx-auto" />

          <div className="h-2 w-[90%] bg-slate-600" />
          <div className="h-2 w-[78%] bg-slate-600" />
          <div className="h-2 w-[65%] bg-slate-600" />
        </div>

        <div className="flex mt-4 gap-6">
          <div className="basis-1/2 border-r-2 border-slate-600 space-y-2 pr-6">
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
          </div>

          <div className="basis-1/2 space-y-2">
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateThree = ({
  dummy = true,
  templateData,
  ActiveDummyInSmallScreens,
}: TheTemplateProps) => {
  return (
    <TemplateHolder
      dummy={{
        value: dummy,
        DummyComponent: <Dummy />,
      }}
      templateData={templateData}
      Template={TheTemplate}
      ActiveDummyInSmallScreens={ActiveDummyInSmallScreens}
    />
  );
};
export default TemplateThree;
