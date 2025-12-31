import { render, screen } from "@testing-library/react";
import testProfileUrlValidation, {
  type TestProfileUrlValidationParams,
} from "@/lib/test/testProfileUrlValidation";

// components
import Profiles from "@/app/(allPages)/cv-form/components/form/yourInfoSection/sections/Profiles";

// types
import type { InputsTypes } from "@/app/(allPages)/cv-form/page";
import type { FieldError, FieldErrors } from "react-hook-form";

describe("CV Form Profiles Section", () => {
  it("register 3 Profiles inputs", () => {
    const registerFnMock = jest.fn();

    render(
      <Profiles
        register={registerFnMock}
        errors={{} as FieldErrors<InputsTypes>}
      />
    );

    expect(registerFnMock).toHaveBeenCalledTimes(3);
  });

  it("render 3 profile inputs", () => {
    render(
      <Profiles register={jest.fn()} errors={{} as FieldErrors<InputsTypes>} />
    );

    const inputs = [
      "linkedin-profile-link",
      "github-profile-link",
      "Behance-profile-link",
    ];

    inputs.forEach((inp) => {
      const input = screen.getByPlaceholderText(inp.replaceAll("-", " "));
      expect(input).toBeInTheDocument();
    });

    inputs.forEach((inp) => {
      const input = screen.queryByTitle(`${inp}-error-msg-holder`);
      expect(input).not.toBeInTheDocument();
    });
  });

  it("render 3 profile inputs with error messages", () => {
    const inputs = {
      "linkedin-profile-link": "invalid linkedin profile url",
      "github-profile-link": "invalid github profile url",
      "Behance-profile-link": "invalid Behance profile url",
    };

    render(
      <Profiles
        register={jest.fn()}
        errors={{
          linkedinLink: {
            message: inputs["linkedin-profile-link"],
          } as FieldError,
          BehanceLink: {
            message: inputs["Behance-profile-link"],
          } as FieldError,
          githubLink: {
            message: inputs["github-profile-link"],
          } as FieldError,
        }}
      />
    );

    Object.entries(inputs).forEach(([inp]) => {
      const input = screen.getByPlaceholderText(inp.replaceAll("-", " "));
      expect(input).toBeInTheDocument();
    });

    Object.entries(inputs).forEach(([inp, errorMsg]) => {
      const input = screen.getByTitle(`${inp}-error-msg-holder`);
      expect(input).toBeInTheDocument();
      expect(input).toHaveTextContent(errorMsg);
    });
  });
});

const linkedinURLTester: TestProfileUrlValidationParams = {
  validUrls: [
    "https://www.linkedin.com/in/johndoe",
    "http://www.linkedin.com/in/janedoe/",
    "linkedin.com/in/user-with-hyphens",
    "www.linkedin.com/in/user_with_underscores",
    "https://linkedin.com/in/first.last",
  ],
  invalidUrls: [
    "https://www.linkedin.com/company/google",
    "https://www.linkedin.com/feed/",
    "https://www.linkedin.com/in/",
    "linkedin.com",
    "invalidurl.com/in/johndoe",
    "ftp://www.linkedin.com/in/johndoe",
  ],
  errorMessage: "please enter a valid linkedin profile URL",
  fieldName: "linkedinLink",
  suiteName: "linkedin",
};
const githubURLTester: TestProfileUrlValidationParams = {
  validUrls: [
    "https://github.com/octocat",
    "https://github.com/github",
    "http://github.com/google",
    "https://github.com/mojombo",
    "https://github.com/torvalds",
    "https://github.com/some-user",
    "https://github.com/a",
    "https://github.com/2020-dev",
    "https://www.github.com/username",
    "https://github.com/username/",
    `https://github.com/${"a".repeat(39)}`,
  ],
  invalidUrls: [
    "https://github.com/microsoft/vscode",
    "https://github.com/user--name",
    "https://github.com/-username",
    "https://github.com/username-",
    "https://github.com/user with spaces",
    "https://www.github.com/a-long-username-that-is-way-too-long-for-github",
    "http://google.com/octocat",
    "ftp://github.com/octocat",
  ],
  errorMessage: "please enter a valid github profile URL",
  fieldName: "githubLink",
  suiteName: "github",
};
const behanceURLTester: TestProfileUrlValidationParams = {
  validUrls: [
    "https://behance.net/johndoe",
    "https://www.behance.net/janedoe",
    "http://behance.net/art_design",
    "https://behance.net/some-user",
    "https://behance.net/123-artist",
    "https://behance.net/johndoe/",
  ],
  invalidUrls: [
    "https://behance.net/johndoe/project",
    "https://behance.com/johndoe",
    "ftp://behance.net/johndoe",
    "https://behance.net/",
    "https://www.behance.net/user with spaces",
  ],
  errorMessage: "please enter a valid behance profile URL",
  fieldName: "BehanceLink",
  suiteName: "behance",
};

[linkedinURLTester, githubURLTester, behanceURLTester].forEach((tester) =>
  testProfileUrlValidation(tester)
);
