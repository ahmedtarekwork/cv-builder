"use client";

// nextjs
import { useSearchParams } from "next/navigation";
// react
import { useEffect, useRef, useState } from "react";

// templates
import templates from "@/components/templates";

// components
import ChooseTemplate from "./components/ChooseTemplate";
import ClickSaveBtnAlert from "./components/ClickSaveBtnAlert";
import CVForm from "./components/form/CVForm";
import LoadingScreen from "@/components/layout/LoadingScreen";

// types
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { Job, Project, Skill } from "@/lib/types";

// hooks
import useGetFormInitData from "@/hooks/useGetFormInitData";

export type TemplateDataType = Record<
  | "name"
  | "jobTitle"
  | "phoneNumber"
  | "location"
  | "linkedinLink"
  | "about"
  | "education"
  | "email",
  string
> &
  Partial<Record<"githubLink" | "BehanceLink" | "websiteLink", string>> & {
    skills: Skill[];
    jobs: Job[];
    projects: Project[];
  };

export type InputsTypes = TemplateDataType & { projectName: string };

export type FormChildrensProps = {
  register: UseFormRegister<InputsTypes>;
  errors: FieldErrors<InputsTypes>;
};

const NewCVPage = () => {
  const templateId = useSearchParams().get("id");

  // refs
  const editMode = useRef(!!templateId);
  const initTemplate = useRef<keyof typeof templates>("1");

  // states
  const [initData, setInitData] = useState<TemplateDataType | undefined>(
    undefined
  );
  const [initImage, setInitImage] = useState<
    Record<"img" | "id", string> | undefined
  >(undefined);

  const [activeTemplate, setActiveTemplate] =
    useState<keyof typeof templates>("1");
  const [initLoading, setInitLoading] = useState(!!editMode.current);

  const getFormInitData = useGetFormInitData({
    initTemplate,
    setInitData,
    setInitImage,
    setInitLoading,
    setActiveTemplate,
    templateId,
  });

  useEffect(() => {
    if (editMode.current) (async () => await getFormInitData())();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initLoading) return <LoadingScreen />;

  return (
    <>
      <ClickSaveBtnAlert isEditMode={editMode.current} />

      <ChooseTemplate
        activeTemplate={activeTemplate}
        setActiveTemplate={setActiveTemplate}
      />

      <CVForm
        initTemplate={initTemplate.current}
        initData={initData}
        initImage={initImage}
        activeTemplate={activeTemplate}
        isEditMode={editMode.current}
        templateId={templateId || undefined}
      />
    </>
  );
};

export default NewCVPage;
