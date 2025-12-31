// components
// shadcn
import { Input } from "@/components/ui/input";

// types
import type { FormChildrensProps } from "../../page";

const ProjectName = ({ errors, register }: FormChildrensProps) => {
  const { projectName: projectNameErr } = errors;

  return (
    <>
      <h2 className="title mb-4">Project Name</h2>

      <Input
        aria-label="projectName"
        placeholder="Project Name"
        {...register("projectName", {
          required: "You must provide a name for this project",
        })}
      />

      {projectNameErr?.message && (
        <p
          data-testid="project-name-error-msg-holder"
          className="text-destructive"
        >
          {projectNameErr?.message}
        </p>
      )}
    </>
  );
};
export default ProjectName;
