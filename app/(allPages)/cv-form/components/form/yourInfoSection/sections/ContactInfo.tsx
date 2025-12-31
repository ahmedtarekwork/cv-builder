// components
// shadcn
import { Input } from "@/components/ui/input";

// types
import type { FormChildrensProps } from "@/app/(allPages)/cv-form/page";

const ContactInfo = ({ register, errors }: FormChildrensProps) => {
  const {
    email: emailErr,
    location: locationErr,
    websiteLink: websiteLinkErr,
  } = errors;

  return (
    <div className="inputs-holder">
      <div>
        <Input
          aria-label="location"
          placeholder="location"
          {...register("location", {
            required: "location is required",
          })}
        />
        {locationErr?.message && (
          <p title="location-error-msg-holder" className="text-destructive">
            {locationErr.message}
          </p>
        )}
      </div>

      <div>
        <Input
          aria-label="websiteLink"
          placeholder="your website link"
          {...register("websiteLink", {
            validate: (val) => {
              if (!val) return true;
              return (
                /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i.test(
                  val
                ) || "please enter a valid URL"
              );
            },
          })}
        />
        {websiteLinkErr?.message && (
          <p
            title="your-website-link-error-msg-holder"
            className="text-destructive"
          >
            {websiteLinkErr.message}
          </p>
        )}
      </div>

      <div>
        <Input
          type="email"
          aria-label="email"
          placeholder="email"
          {...register("email", {
            required: "email is required",
            validate: (val) => {
              return (
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                  val
                ) || "please enter a valid email"
              );
            },
          })}
        />
        {emailErr?.message && (
          <p title="email-error-msg-holder" className="text-destructive">
            {emailErr.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default ContactInfo;
