// components
import InputsSection, {
  type InputsSectionListItemProps,
  type SectionsProps,
} from "../InputsSection";

// shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// types
import type { TemplateDataType } from "../../../../page";
import type { Path } from "react-hook-form";
import type { Project } from "@/lib/types";

const ListItem = ({ i, remove, register }: InputsSectionListItemProps) => {
  return (
    <li className="flex flex-col gap-2 bg-secondary-transparent bg-opacity-20 p-2 rounded-md border-secondary border-2">
      <Input
        placeholder={`project ${i + 1} name`}
        {...register(`projects.${i}.name` as Path<TemplateDataType>)}
      />
      <Textarea
        placeholder={`project ${i + 1} description`}
        {...register(`projects.${i}.description` as Path<TemplateDataType>)}
      />
      {i !== 0 && (
        <Button variant="destructive" onClick={() => remove(i)} type="button">
          Remove Project
        </Button>
      )}
    </li>
  );
};

const ProjectsSection = ({
  control,
  register,
  errorMsg,
  initialValue,
}: SectionsProps<Project>) => {
  return (
    <InputsSection
      control={control}
      name="projects"
      addBtnContent="Add Project"
      title="Your Projects"
      initialValue={initialValue}
      ListItem={(fieldId, i, remove) => (
        <ListItem key={fieldId} i={i} remove={remove} register={register} />
      )}
      errorMsg={errorMsg}
    />
  );
};
export default ProjectsSection;
