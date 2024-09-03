import type { FC } from "react";
import type { TemplateDataType } from "@/app/new-cv/page";

type Props = {
  dummy: {
    value: boolean;
    DummyComponent: JSX.Element;
  };
  Template: FC<TemplateDataType | (TemplateDataType & { imgSrc?: string })>;
  templateData?: TemplateDataType | (TemplateDataType & { imgSrc?: string });
  turnDummyInSmallScreens?: boolean;
};

export type TheTemplateProps = Pick<
  Props,
  "templateData" | "turnDummyInSmallScreens"
> & {
  dummy: Props["dummy"]["value"];
};

const TemplateHolder = ({
  dummy,
  Template,
  templateData,
  turnDummyInSmallScreens = false,
}: Props) => {
  if (dummy.value) return dummy.DummyComponent;

  const initData: Props["templateData"] = {
    name: "Ahmed Tarek",
    location: "Alex, Egypt",
    about: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
              accusamus, eaque similique autem assumenda est fugiat voluptatem
              maxime non quae temporibus quo repellendus ex ab ipsum? Aut error
              ex provident.`,
    education: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
              accusamus, eaque similique autem assumenda est fugiat voluptatem
              maxime non quae temporibus quo repellendus ex ab ipsum? Aut error
              ex provident.`,
    jobs: [
      { job: "Lorem ipsum, dolor" },
      { job: "Lorem ipsum, dolor" },
      { job: "Lorem ipsum, dolor" },
    ],
    skills: [
      { skill: "Lorem ipsum, dolor" },
      { skill: "Lorem ipsum, dolor" },
      { skill: "Lorem ipsum, dolor" },
      { skill: "Lorem ipsum, dolor" },
      { skill: "Lorem ipsum, dolor" },
    ],
    jobTitle: "Frontend React.js web dev",
    email: "test@mail.io",
    projects: [
      {
        name: "Project Name",
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
              accusamus, eaque similique autem assumenda est fugiat voluptatem
              maxime non quae temporibus quo repellendus ex ab ipsum? Aut error
              ex provident.`,
      },
      {
        name: "Project Name",
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
              accusamus, eaque similique autem assumenda est fugiat voluptatem
              maxime non quae temporibus quo repellendus ex ab ipsum? Aut error
              ex provident.`,
      },
      {
        name: "Project Name",
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
              accusamus, eaque similique autem assumenda est fugiat voluptatem
              maxime non quae temporibus quo repellendus ex ab ipsum? Aut error
              ex provident.`,
      },
    ],

    linkedinLink: "www.linkedin.com/in/ahmed-tarek-099618209",
    websiteLink: "https://ahmed-profile.vercel.app",
    phoneNumber: "01284059026",
    githubLink: "https://github.com/ahmedtarekwork",
    imgSrc: "/person.svg",
  };

  return turnDummyInSmallScreens ? (
    <>
      <div className="hide-template-data h-full flex flex-col flex-1">
        {<Template {...(templateData || initData)} />}
      </div>

      <div className="show-dummy min-h-[400px] grid">
        {dummy.DummyComponent}
      </div>
    </>
  ) : (
    <Template {...(templateData || initData)} />
  );
};
export default TemplateHolder;
