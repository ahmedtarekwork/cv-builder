"use client";

// nextjs
import Image from "next/image";

// components
import TemplateHolder, { type TheTemplateProps } from "../TemplateHolder";

// types
import type { TemplateDataType } from "@/app/(allPages)/cv-form/page";

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
  imgSrc,
}: NonNullable<TheTemplateProps["templateData"] & { imgSrc?: string }>) => {
  return (
    <div className="h-full flex flex-1">
      <div className="bg-blue-800 break-words space-y-3 max-w-[250px] flex-[0.4] text-white p-2">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="image"
            width={110}
            height={110}
            className="mx-auto"
            style={{ aspectRatio: 1, objectFit: "contain" }}
          />
        )}

        <div className="text-left space-y-3">
          <h2 className="font-bold border-b-2 text-xl border-white">Info</h2>
          <p>name: {name}</p>
          <p>email: {email}</p>
          <p>location: {location}</p>
          <p>jop title: {jobTitle}</p>
          <p>phone number: {phoneNumber}</p>
          {websiteLink && <p>website link: {websiteLink}</p>}
          {githubLink && <p>github link: {githubLink}</p>}
          {linkedinLink && <p>linkedin link: {linkedinLink}</p>}
          {BehanceLink && <p>Behance link: {BehanceLink}</p>}
        </div>

        {!!skills.length && (
          <div className="text-left space-y-3">
            <h2 className="font-bold border-b-2 text-xl border-white">
              Skills
            </h2>
            <ul className="text-left space-y-3">
              {skills.map(({ skill }, i) => (
                <li key={i}>- {skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex-1 text-left">
        <div className="p-2 space-y-4 flex-1">
          <h2 className="font-bold border-b-2 text-2xl border-slate-600">
            About Me
          </h2>
          <p className="text-left">{about}</p>
        </div>

        <div className="p-2 space-y-4 flex-1">
          <h2 className="font-bold border-b-2 text-2xl border-slate-600">
            Education
          </h2>
          <p className="text-left">{education}</p>
        </div>

        {!!projects.length && (
          <div className="p-2 space-y-4 flex-1">
            <h2 className="font-bold border-b-2 text-2xl border-slate-600">
              Projects
            </h2>
            <ul className="text-left space-y-2">
              {projects.map(({ name, description }, i) => (
                <li key={i}>
                  <h3 className="font-bold">{name}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!!jobs.length && (
          <div className="p-2 space-y-4 flex-1">
            <h2 className="font-bold border-b-2 text-2xl border-slate-600">
              Experience
            </h2>
            <ul className="text-left">
              {jobs.map(({ job }, i) => (
                <li key={i}>{job}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Dummy = () => {
  return (
    <div className="h-full flex">
      <div className="bg-blue-800 space-y-3 max-w-[250px] basis-1/4 text-white p-2">
        <div className="w-10 h-10 rounded-full bg-white mx-auto" />

        <div className="space-y-2">
          <div className="w-1/2 h-2 mx-auto bg-white" />
          <div className="w-full h-1 bg-white" />
          <div className="w-[80%] h-1 bg-white" />
          <div className="w-[60%] h-1 bg-white" />
        </div>
        <div className="space-y-2">
          <div className="w-1/2 h-2 mx-auto bg-white" />
          <div className="w-full h-1 bg-white" />
          <div className="w-[80%] h-1 bg-white" />
          <div className="w-[60%] h-1 bg-white" />
        </div>
        <div className="space-y-2">
          <div className="w-1/2 h-2 mx-auto bg-white" />
          <div className="w-full h-1 bg-white" />
          <div className="w-[80%] h-1 bg-white" />
          <div className="w-[60%] h-1 bg-white" />
        </div>
      </div>

      <div className="p-2 space-y-4 flex-1">
        <div className="space-y-2">
          <div className="w-1/4 h-3 mx-auto bg-slate-600" />
          <div className="w-full h-1 bg-slate-600" />
          <div className="w-[80%] h-1 bg-slate-600" />
          <div className="w-[60%] h-1 bg-slate-600" />
        </div>
        <div className="space-y-2">
          <div className="w-1/4 h-3 mx-auto bg-slate-600" />
          <div className="w-full h-1 bg-slate-600" />
          <div className="w-[80%] h-1 bg-slate-600" />
          <div className="w-[60%] h-1 bg-slate-600" />
        </div>
        <div className="space-y-2">
          <div className="w-1/4 h-3 mx-auto bg-slate-600" />
          <div className="w-full h-1 bg-slate-600" />
          <div className="w-[80%] h-1 bg-slate-600" />
          <div className="w-[60%] h-1 bg-slate-600" />
        </div>
      </div>
    </div>
  );
};

const TemplateOne = ({
  dummy = true,
  templateData,
  turnDummyInSmallScreens,
}: TheTemplateProps) => {
  return (
    <TemplateHolder
      Template={TheTemplate}
      dummy={{
        value: dummy,
        DummyComponent: <Dummy />,
      }}
      turnDummyInSmallScreens={turnDummyInSmallScreens}
      templateData={templateData as TemplateDataType}
    />
  );
};
export default TemplateOne;
