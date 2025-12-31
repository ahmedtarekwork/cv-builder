// components
// shadcn
import { Input } from "@/components/ui/input";

// types
import type { FormChildrensProps } from "@/app/(allPages)/cv-form/page";

const PersonalInfo = ({ register, errors }: FormChildrensProps) => {
  const {
    jobTitle: jobTitleErr,
    name: nameErr,
    phoneNumber: phoneNumberErr,
  } = errors;

  return (
    <div className="inputs-holder">
      <div>
        <Input
          aria-label="name"
          placeholder="name"
          {...register("name", {
            required: "name is required",
          })}
        />
        {nameErr?.message && (
          <p title="name-error-msg-holder" className="block text-destructive">
            {nameErr.message}
          </p>
        )}
      </div>

      <div>
        <Input
          aria-label="jobTitle"
          placeholder="job title"
          {...register("jobTitle", {
            required: "job title is required",
          })}
        />
        {jobTitleErr?.message && (
          <p title="job-title-error-msg-holder" className="text-destructive">
            {jobTitleErr.message}
          </p>
        )}
      </div>

      <div>
        <Input
          aria-label="phoneNumber"
          placeholder="phone number"
          type="number"
          {...register("phoneNumber", {
            required: "phone number is required",
            valueAsNumber: true,
          })}
        />
        {phoneNumberErr?.message && (
          <p title="phone-number-error-msg-holder" className="text-destructive">
            {phoneNumberErr.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default PersonalInfo;
