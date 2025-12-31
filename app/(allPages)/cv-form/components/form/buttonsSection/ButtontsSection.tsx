// react
import type { Dispatch, RefObject, SetStateAction } from "react";

// components
import PerviewBtn from "./PerviewBtn";
import ResetBtn from "./ResetBtn";
import Spinner from "@/components/Spinner";

// templates
import templates from "@/components/templates";

// shadcn
import { Button } from "@/components/ui/button";

// icons
import { FaSave } from "react-icons/fa";

// types
import type { InputsTypes, TemplateDataType } from "../../../page";
import type { UseFormGetValues, UseFormReset } from "react-hook-form";
import type { AddImageRefType } from "../addImage/AddImage";

export type BtnsSectionProps = {
  isLoading: boolean;
  isEditMode: boolean;
  currentTemplate: keyof typeof templates;
  reset: UseFormReset<InputsTypes>;
  getValues: UseFormGetValues<InputsTypes>;
  addImageRef: RefObject<AddImageRefType>;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  initData?: TemplateDataType;
  initJob: {
    job: string;
  };

  image?: File;
  initImage?: Record<"id" | "img", string>;
};

const ButtontsSection = ({
  isLoading,
  currentTemplate,
  reset,
  getValues,
  isEditMode,
  setImage,
  initData,
  addImageRef,
  initJob,
  image,
  initImage,
}: BtnsSectionProps) => {
  return (
    <div className="flex gap-2 [&>*]:flex-1 flex-wrap pb-2">
      <ResetBtn
        addImageRef={addImageRef}
        initData={initData}
        setImage={setImage}
        isEditMode={isEditMode}
        reset={reset}
        initJob={initJob}
      />

      <PerviewBtn
        image={image}
        initImage={initImage}
        getValues={getValues}
        currentTemplate={currentTemplate}
      />

      {/* disabled={isLoading} */}
      <Button title="submit" className="flex gap-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <FaSave size={25} /> Save
          </>
        )}
      </Button>
    </div>
  );
};
export default ButtontsSection;
