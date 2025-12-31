// types
import type {
  InputsTypes,
  TemplateDataType,
} from "@/app/(allPages)/cv-form/page";

import type {
  SubmitHandler,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormSetError,
} from "react-hook-form";

export type ArrayFieldsErrorsFnParams = {
  skills: {
    skill: string;
  }[];
  projects: {
    name: string;
    description: string;
  }[];
  setError: UseFormSetError<InputsTypes>;
  clearErrors: UseFormClearErrors<InputsTypes>;

  invokeSubmit?: boolean;
  handleSubmit: UseFormHandleSubmit<InputsTypes, undefined>;
  onSubmit: SubmitHandler<InputsTypes>;
};

type ArrayFieldsErrorsFn = (
  params: ArrayFieldsErrorsFnParams
) => Record<"skillsReason" | "projectsReason", boolean>;

const arrayFieldsErrors: ArrayFieldsErrorsFn = ({
  skills = [],
  projects = [],
  setError,
  clearErrors,
  handleSubmit,
  onSubmit,
  invokeSubmit = false,
}) => {
  const projectsReason = (projects || [])
    .map((project) => Object.values(project))
    .flat(Infinity)
    .some((val) => !val);

  const skillsReason = (skills || [])
    .map(({ skill }) => skill)
    .some((skill) => !skill);

  const singleProjectsReason =
    projects?.length === 1 && Object.values(projects?.[0]).every((val) => !val);

  const singleSkillsReason = skills?.length === 1 && !skills?.[0].skill;

  const reasons = [
    {
      reason: singleProjectsReason || projectsReason,
      name: "projects",
      message: singleProjectsReason
        ? "you must have at least one project"
        : "you must fill all properties for each project, or remove unneccessery ones",
    },
    {
      reason: singleSkillsReason || skillsReason,
      name: "skills",
      message: singleSkillsReason
        ? "you must have at least one skill"
        : "you must fill in all skills you have added, or remove empty ones",
    },
  ].map(({ reason, name, message }) => {
    if (reason) setError(name as keyof TemplateDataType, { message });
    else clearErrors(name as keyof TemplateDataType);

    return reason;
  });

  if (reasons.every((reason) => !reason) && invokeSubmit) {
    handleSubmit(onSubmit)();
  }

  return { skillsReason, projectsReason };
};

export default arrayFieldsErrors;
