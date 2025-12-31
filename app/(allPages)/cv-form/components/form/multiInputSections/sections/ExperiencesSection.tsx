// components
import MultiInputsSectionSingleCell from "../MultiInputsSectionSingleCell";
import InputsSection, { type SectionsProps } from "../InputsSection";

// types
import type { Job } from "@/lib/types";

const ExperiencesSection = ({
  control,
  register,
  errorMsg,
  initialValue,
}: SectionsProps<Job>) => {
  return (
    <InputsSection
      control={control}
      name="jobs"
      addBtnContent="Add Experience"
      title="Your Experience"
      initialValue={initialValue}
      ListItem={(fieldId, i, remove) => (
        <MultiInputsSectionSingleCell
          type="Job"
          key={fieldId}
          i={i}
          remove={remove}
          register={register}
        />
      )}
      errorMsg={errorMsg}
    />
  );
};
export default ExperiencesSection;
