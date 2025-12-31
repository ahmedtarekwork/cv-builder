// react
import { memo, useCallback, useEffect, useRef, useState } from "react";

// components
import AddImage, { type AddImageRefType } from "./addImage/AddImage";

// sections
import ProjectName from "./ProjectName";
import YourInfoSection from "./yourInfoSection/YourInfoSection";
import ExperiencesSection from "./multiInputSections/sections/ExperiencesSection";
import ProjectsSection from "./multiInputSections/sections/ProjectsSection";
import SkillsSection from "./multiInputSections/sections/SkillsSection";
import ButtontsSection from "./buttonsSection/ButtontsSection";

// templates
import templates from "@/components/templates";

// types
import type { InputsTypes, TemplateDataType } from "../../page";

import arrayFieldsErrors, {
  type ArrayFieldsErrorsFnParams,
} from "@/lib/CVFormUtils/arrayFieldsErrors";

// RHF
import { SubmitErrorHandler, useForm } from "react-hook-form";

// firebase
import useHandleSubmitCVForm from "@/hooks/useHandleSubmitCVForm";

export type CVFormProps = {
  activeTemplate: keyof typeof templates;
  isEditMode?: boolean;
  templateId?: string;
  initData?: TemplateDataType;
  initImage?: Record<"img" | "id", string>;
  initTemplate: "1" | "2" | "3";
};

const initSkill = { skill: "" };
const initJob = { job: "" };
const initProject = { name: "", description: "" };

const CVForm = ({
  activeTemplate,
  isEditMode,
  templateId,
  initData,
  initImage,
  initTemplate,
}: CVFormProps) => {
  const addImageRef = useRef<AddImageRefType>(null);

  const [image, setImage] = useState<File | undefined>(undefined);

  // RHF
  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InputsTypes>({
    defaultValues: {
      projectName: "untitled",
      skills: [initSkill],
      jobs: [initJob],
      projects: [initProject],
    },
  });

  const arrayFieldsErrorsFnWrapper = useCallback(
    (
      data: Omit<
        ArrayFieldsErrorsFnParams,
        "clearErrors" | "setError" | "onSubmit" | "handleSubmit"
      >
    ) =>
      arrayFieldsErrors({
        ...data,
        setError,
        clearErrors,
        onSubmit,
        handleSubmit,
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onInvalid: SubmitErrorHandler<InputsTypes> = () => {
    const skills = getValues("skills");
    const projects = getValues("projects");

    arrayFieldsErrorsFnWrapper({ skills, projects, invokeSubmit: true });
  };

  // isLoading
  const { handler: onSubmit, isLoading } = useHandleSubmitCVForm({
    arrayFieldsErrorsFnWrapper,
    initJob,
    initProject,
    initSkill,
    initTemplate,
    activeTemplate,
    initData,
    initImage,
    isEditMode,
    templateId,
    image,
    addImageRef,
  });

  useEffect(() => {
    Object.entries(initData || {}).forEach(([key, value]) => {
      if (key === "jobs" && !value.length) return;
      setValue(key as keyof InputsTypes, value);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData]);
  // useEffect(() => {
  //   console.log("i hate this component", isLoading);
  // }, [isLoading]);

  return (
    <form
      aria-label="CV form"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
    >
      <fieldset disabled={isLoading} className="pt-4 space-y-2">
        <ProjectName register={register} errors={errors} />

        <YourInfoSection errors={errors} register={register} />

        <div className="flex gap-2 max-lg:flex-col">
          <SkillsSection
            control={control}
            register={register}
            errorMsg={errors.skills?.message}
            initialValue={initSkill}
          />

          <ExperiencesSection
            control={control}
            register={register}
            initialValue={initJob}
          />
        </div>

        <div className="flex gap-2 max-lg:flex-col">
          <ProjectsSection
            errorMsg={errors.projects?.message}
            control={control}
            register={register}
            initialValue={initProject}
          />

          {templates[activeTemplate].image && (
            <AddImage
              isLoading={isLoading}
              ref={addImageRef}
              image={image}
              setImage={setImage}
              initImgSrc={initImage?.img}
            />
          )}
        </div>

        <ButtontsSection
          isEditMode={!!isEditMode}
          initData={initData}
          setImage={setImage}
          addImageRef={addImageRef}
          initJob={initJob}
          reset={reset}
          getValues={getValues}
          isLoading={isLoading}
          currentTemplate={activeTemplate}
          image={image}
          initImage={initImage}
        />
      </fieldset>
    </form>
  );
};
export default memo(CVForm);
