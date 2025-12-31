// types
import type {
  InputsTypes,
  TemplateDataType,
} from "@/app/(allPages)/cv-form/page";
import type { Job, Project, Skill } from "../types";

type Params = {
  finalData: Record<string, unknown>;
  otherInfo: {
    newData: InputsTypes;
    initSkill: Skill;
    initProject: Project;
    initJob: Job;
    initData?: TemplateDataType;
  };
};

const perpareFinalUploadDataObject = (
  finalData: Params["finalData"],
  { newData, initJob, initProject, initSkill, initData }: Params["otherInfo"]
) => {
  finalData = Object.fromEntries(
    Object.entries(newData).filter(([key, value]) => {
      const oldValue = initData?.[key as keyof typeof initData];
      if (!oldValue) return;

      if (Array.isArray(value)) {
        if (!Array.isArray(oldValue)) return;
        if (oldValue.length !== value.length) return true;

        switch (key) {
          case "skills": {
            return !oldValue.every(
              (old, i) =>
                (value[i] as typeof initSkill)?.skill ===
                (old as typeof initSkill)?.skill
            );
          }

          case "jobs": {
            return !oldValue.every(
              (old, i) =>
                (value[i] as typeof initJob)?.job ===
                (old as typeof initJob)?.job
            );
          }

          case "projects": {
            return !oldValue.every((old, i) => {
              const oldProject = old as typeof initProject;
              const currentProject = value[i] as typeof initProject;

              return (
                oldProject?.name === currentProject?.name ||
                oldProject?.description === currentProject?.description
              );
            });
          }
        }
      } else return oldValue !== value;
    })
  );

  return finalData;
};

export default perpareFinalUploadDataObject;
