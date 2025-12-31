// components
// shadcn
import { Input } from "@/components/ui/input";

// types
import type { FormChildrensProps } from "@/app/(allPages)/cv-form/page";

const Profiles = ({ register, errors }: FormChildrensProps) => {
  const {
    linkedinLink: linkedinLinkErr,
    BehanceLink: BehanceLinkErr,
    githubLink: githubLinkErr,
  } = errors;

  return (
    <div className="inputs-holder">
      <div>
        <Input
          placeholder="linkedin profile link"
          aria-label="linkedinLink"
          {...register("linkedinLink", {
            validate: (val) => {
              if (!val) return true;
              return (
                /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-\_.]+\/?$/i.test(
                  val
                ) || "please enter a valid linkedin profile URL"
              );
            },
          })}
        />
        {linkedinLinkErr?.message && (
          <p
            title="linkedin-profile-link-error-msg-holder"
            className="text-destructive"
          >
            {linkedinLinkErr.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="github profile link"
          aria-label="githubLink"
          {...register("githubLink", {
            validate: (val) => {
              if (!val) return true;
              return (
                /^https?:\/\/(www\.)?github\.com\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}\/?$/i.test(
                  val
                ) || "please enter a valid github profile URL"
              );
            },
          })}
        />
        {githubLinkErr?.message && (
          <p
            title="github-profile-link-error-msg-holder"
            className="text-destructive"
          >
            {githubLinkErr.message}
          </p>
        )}
      </div>

      <div>
        <Input
          placeholder="Behance profile link"
          aria-label="BehanceLink"
          {...register("BehanceLink", {
            validate: (val) => {
              if (!val) return true;
              return (
                /^https?:\/\/(www\.)?behance\.net\/[\w-]+\/?$/i.test(val) ||
                "please enter a valid behance profile URL"
              );
            },
          })}
        />
        {BehanceLinkErr?.message && (
          <p
            title="Behance-profile-link-error-msg-holder"
            className="text-destructive"
          >
            {BehanceLinkErr.message}
          </p>
        )}
      </div>
    </div>
  );
};
export default Profiles;
