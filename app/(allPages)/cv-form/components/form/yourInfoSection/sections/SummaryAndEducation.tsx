// components
// shadcn
import { Textarea } from "@/components/ui/textarea";

// types
import type { FormChildrensProps } from "@/app/(allPages)/cv-form/page";

const SummaryAndEducation = ({ register, errors }: FormChildrensProps) => {
  const { about: aboutErr, education: educationErr } = errors;

  return (
    <div className="inputs-holder">
      <div>
        <Textarea
          placeholder="About You"
          aria-label="about"
          {...register("about", {
            required: "you need to type something about yourself",
          })}
        />
        {aboutErr?.message && (
          <p title="About-You-error-msg-holder" className="text-destructive">
            {aboutErr.message}
          </p>
        )}
      </div>

      <div>
        <Textarea
          aria-label="education"
          placeholder="Education"
          {...register("education", {
            required: "you need to type something about your education",
          })}
        />
        {educationErr?.message && (
          <p title="Education-error-msg-holder" className="text-destructive">
            {educationErr.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default SummaryAndEducation;
