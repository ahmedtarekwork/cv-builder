// nextjs
import { useRouter } from "next/navigation";

// react
import { type RefObject, useState } from "react";

// types
import type { InputsTypes } from "@/app/(allPages)/cv-form/page";
import type { SubmitHandler } from "react-hook-form";
import type { ArrayFieldsErrorsFnParams } from "@/lib/CVFormUtils/arrayFieldsErrors";
import type { CVFormProps } from "@/app/(allPages)/cv-form/components/form/CVForm";
import type { Job, Project, Skill } from "@/lib/types";
import type { AddImageRefType } from "@/app/(allPages)/cv-form/components/form/addImage/AddImage";

// templates
import templates from "@/components/templates";

// utils
import { toast } from "sonner";
import uploadImg from "@/lib/CVFormUtils/uploadImg";
import removeImg from "@/lib/CVFormUtils/removeImg";
import perpareFinalUploadDataObject from "@/lib/CVFormUtils/perpareFinalUploadDataObject";
import submitCVFormChanges from "@/lib/CVFormUtils/submitCVFormChanges";

// firebase
import { serverTimestamp } from "firebase/firestore";
import { auth } from "@/config/firebaseConfig";

type ArrayFieldsErrorsFnWrapperType = (
  data: Omit<
    ArrayFieldsErrorsFnParams,
    "onSubmit" | "handleSubmit" | "setError" | "clearErrors"
  >
) => Record<"projectsReason" | "skillsReason", boolean>;

type Props = CVFormProps & {
  arrayFieldsErrorsFnWrapper: ArrayFieldsErrorsFnWrapperType;
  initSkill: Skill;
  initProject: Project;
  initJob: Job;
  image?: File;
  addImageRef: RefObject<AddImageRefType>;
};

const useHandleSubmitCVForm = ({
  arrayFieldsErrorsFnWrapper,
  isEditMode,
  activeTemplate,
  initSkill,
  initProject,
  initJob,
  initData,
  initImage,
  initTemplate,
  templateId,
  image,
  addImageRef,
}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handler: SubmitHandler<InputsTypes> = async (data, e) => {
    e?.preventDefault();

    let { skills, projects, jobs } = data;

    const { projectsReason, skillsReason } = arrayFieldsErrorsFnWrapper({
      skills,
      projects,
    });

    if (skillsReason || projectsReason) return;

    jobs = jobs.filter(({ job }) => job);

    const uploadImgAndGetImgSrc = async () => {
      if (templates[activeTemplate].image) {
        return await uploadImg({
          image,
          initImageId: initImage?.id,
          setIsLoading,
        });
      }

      // remove img
      if (isEditMode) {
        return await removeImg({
          setIsLoading,
          image,
          isShowImg: !!addImageRef.current?.showImg,
          initImgId: initImage?.id,
        });
      }
    };

    setIsLoading(true);
    try {
      let finalData: Record<string, unknown> = {};

      if (isEditMode) {
        finalData = perpareFinalUploadDataObject(finalData, {
          newData: data,
          initSkill,
          initProject,
          initJob,
          initData,
        });

        if (activeTemplate != initTemplate)
          finalData.templateIndex = activeTemplate;

        if (!Object.keys(finalData).length) {
          toast.error("make some changes on your info before save it");
          return;
        }
      } else {
        finalData = {
          ...data,
          templateIndex: +activeTemplate,
          userId: auth.currentUser?.uid,
        };
      }

      finalData.createdAt = serverTimestamp();

      const imgData = await uploadImgAndGetImgSrc(); // upload image
      if (imgData?.imgSrc && imgData?.imgId)
        finalData = { ...finalData, ...imgData };

      await submitCVFormChanges({
        finalData,
        isEditMode,
        router,
        templateId,
      });
    } catch (error) {
      toast.error("something went wrong while downloading your CV");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handler };
};

export default useHandleSubmitCVForm;
