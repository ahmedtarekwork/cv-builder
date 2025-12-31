// components
import MultiInputsSectionSingleCell from "../MultiInputsSectionSingleCell";
import InputsSection, { type SectionsProps } from "../InputsSection";

// types
import type { Skill } from "@/lib/types";

const SkillsSection = ({
  control,
  register,
  errorMsg,
  initialValue,
}: SectionsProps<Skill>) => {
  return (
    <InputsSection
      control={control}
      name="skills"
      addBtnContent="Add Skill"
      title="Your Skills"
      initialValue={initialValue}
      ListItem={(fieldId, i, remove) => (
        <MultiInputsSectionSingleCell
          type="Skill"
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
export default SkillsSection;
