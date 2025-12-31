import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// components
import CVForm, {
  CVFormProps,
} from "@/app/(allPages)/cv-form/components/form/CVForm";

// templates
import templates from "@/components/templates";

// mocks
jest.mock("react-hook-form");
import { setCurrentErrors } from "@/__mocks__/react-hook-form";

jest.mock("@/hooks/useHandleSubmitCVForm.ts");

const URLInputsNames = [
  "websiteLink",
  "BehanceLink",
  "linkedinLink",
  "githubLink",
];

const URLInputsErrorMessagesEntries = URLInputsNames.map((key) => [
  key,
  {
    type: "validate",
    message: `please enter a valid ${key.replace("Link", "")} URL`,
  },
]);

const URLInputsErrorMessages = Object.fromEntries(
  URLInputsErrorMessagesEntries
);

const initialProps = {
  initTemplate: "1" as const,
  activeTemplate: "1" as const,
};

const errorHolders = () => {
  const projectNameErrorMsgHolder = screen.queryByTestId(
    "project-name-error-msg-holder"
  );

  const addImageSectionErrorMsgHolder = screen.queryByTitle(
    "add image error message holder"
  );

  const jobTitleErrorMsgHolder = screen.queryByTitle(
    "job-title-error-msg-holder"
  );
  const phoneNumberErrorMsgHolder = screen.queryByTitle(
    "phone-number-error-msg-holder"
  );
  const nameErrorMsgHolder = screen.queryByTitle("name-error-msg-holder");

  const aboutYouErrorMsgHolder = screen.queryByTitle(
    "About-You-error-msg-holder"
  );
  const educationErrorMsgHolder = screen.queryByTitle(
    "Education-error-msg-holder"
  );

  const locationErrorMsgHolder = screen.queryByTitle(
    "location-error-msg-holder"
  );
  const websiteLinkErrorMsgHolder = screen.queryByTitle(
    "your-website-link-error-msg-holder"
  );
  const emailErrorMsgHolder = screen.queryByTitle("email-error-msg-holder");

  const linkedinProfileLinkErrorMsgHolder = screen.queryByTitle(
    "linkedin-profile-link-error-msg-holder"
  );
  const githubProfileLinkErrorMsgHolder = screen.queryByTitle(
    "github-profile-link-error-msg-holder"
  );
  const behanceProfileLinkErrorMsgHolder = screen.queryByTitle(
    "Behance-profile-link-error-msg-holder"
  );

  const multiInputsSectionErrorMsgHolder = screen.queryAllByTitle(
    "multi-inputs-section-error-msg-holder"
  );

  const experiencesSectionErrorMsgHolder =
    multiInputsSectionErrorMsgHolder.find(
      (el) => el.dataset.testid === "jobs-multi-inputs-section-error-msg-holder"
    ) || null;

  const requiredMultiSectionErrorMsgHolder =
    multiInputsSectionErrorMsgHolder.filter(
      (el) => el.dataset.testid !== "jobs-multi-inputs-section-error-msg-holder"
    );

  const required = [
    ...requiredMultiSectionErrorMsgHolder,
    projectNameErrorMsgHolder,
    jobTitleErrorMsgHolder,
    phoneNumberErrorMsgHolder,
    nameErrorMsgHolder,
    aboutYouErrorMsgHolder,
    educationErrorMsgHolder,
    locationErrorMsgHolder,
    emailErrorMsgHolder,
  ];

  const URLInputs = [
    websiteLinkErrorMsgHolder,
    linkedinProfileLinkErrorMsgHolder,
    githubProfileLinkErrorMsgHolder,
    behanceProfileLinkErrorMsgHolder,
  ];

  const nonRequired = [
    websiteLinkErrorMsgHolder,
    linkedinProfileLinkErrorMsgHolder,
    githubProfileLinkErrorMsgHolder,
    behanceProfileLinkErrorMsgHolder,
    experiencesSectionErrorMsgHolder,
    addImageSectionErrorMsgHolder,
  ];

  const all = [
    projectNameErrorMsgHolder,
    jobTitleErrorMsgHolder,
    phoneNumberErrorMsgHolder,
    nameErrorMsgHolder,
    aboutYouErrorMsgHolder,
    educationErrorMsgHolder,
    locationErrorMsgHolder,
    websiteLinkErrorMsgHolder,
    emailErrorMsgHolder,
    linkedinProfileLinkErrorMsgHolder,
    githubProfileLinkErrorMsgHolder,
    behanceProfileLinkErrorMsgHolder,
    addImageSectionErrorMsgHolder,
    ...multiInputsSectionErrorMsgHolder,
  ];

  return { all, required, nonRequired, URLInputs };
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "https://placehold.co/400x300");
});

describe("Render CV Form Main Elements", () => {
  it("should render titles of CV form sections", () => {
    render(<CVForm activeTemplate="1" initTemplate="1" />);

    const projectNameSectionTitle = screen.getByRole("heading", {
      name: "Project Name",
    });
    const yourInfoSectionTitle = screen.getByRole("heading", {
      name: "Your Info",
    });
    const skillsSectionTitle = screen.getByRole("heading", {
      name: "Your Skills",
    });
    const ExperiencesSectionTitle = screen.getByRole("heading", {
      name: "Your Experience",
    });
    const projectsSectionTitle = screen.getByRole("heading", {
      name: "Your Projects",
    });

    const toBeInTheDocument = [
      projectNameSectionTitle,
      yourInfoSectionTitle,
      skillsSectionTitle,
      ExperiencesSectionTitle,
      projectsSectionTitle,
    ];

    toBeInTheDocument.forEach((el) => expect(el).toBeInTheDocument());
  });

  it("should render all main buttons of CV form with a template that supports an image", () => {
    render(<CVForm activeTemplate="1" initTemplate="1" />);

    const addSkillBtn = screen.getByRole("button", { name: "Add Skill" });
    const addExperienceBtn = screen.getByRole("button", {
      name: "Add Experience",
    });
    const addProjectBtn = screen.getByRole("button", { name: "Add Project" });
    const addYourImgBtn = screen.getByText("Add Your Image");

    const toBeInTheDocument = [
      addSkillBtn,
      addExperienceBtn,
      addProjectBtn,
      addYourImgBtn,
    ];

    toBeInTheDocument.forEach((el) => expect(el).toBeInTheDocument());
  });

  it("shouldn't render 'add your image' section in CV form with a template that not supporting an image", () => {
    render(<CVForm activeTemplate="2" initTemplate="2" />);

    const addYourImgBtn = screen.queryByTitle("add image to CV section");

    expect(addYourImgBtn).not.toBeInTheDocument();
  });

  it("should render all inputs of CV form", () => {
    render(<CVForm activeTemplate="1" initTemplate="1" />);

    const projectNameInput = screen.getByPlaceholderText("Project Name");

    const nameInput = screen.getByPlaceholderText("name");
    const jobTitleInput = screen.getByPlaceholderText("job title");
    const phoneNumberInput = screen.getByPlaceholderText("phone number");

    const locationInput = screen.getByPlaceholderText("location");
    const websiteLinkInput = screen.getByPlaceholderText("your website link");
    const emailInput = screen.getByPlaceholderText("email");

    const aboutYouInput = screen.getByPlaceholderText("About You");
    const educationInput = screen.getByPlaceholderText("Education");

    const linkedinProfileLinkInput = screen.getByPlaceholderText(
      "linkedin profile link"
    );
    const githubProfileLinkInput = screen.getByPlaceholderText(
      "github profile link"
    );
    const behanceProfileLinkInput = screen.getByPlaceholderText(
      "Behance profile link"
    );

    const initExperienceInput = screen.getByPlaceholderText("Job 1");
    const initSkillInput = screen.getByPlaceholderText("Skill 1");
    const initProjectNameInput = screen.getByPlaceholderText("project 1 name");
    const initProjectdescriptionInput = screen.getByPlaceholderText(
      "project 1 description"
    );

    const toBeInTheDocument = [
      projectNameInput,

      nameInput,
      jobTitleInput,
      phoneNumberInput,

      aboutYouInput,
      educationInput,

      emailInput,
      locationInput,
      websiteLinkInput,

      linkedinProfileLinkInput,
      githubProfileLinkInput,
      behanceProfileLinkInput,

      initExperienceInput,
      initSkillInput,
      initProjectNameInput,
      initProjectdescriptionInput,
    ];

    toBeInTheDocument.forEach((el) => expect(el).toBeInTheDocument());
  });

  it("shouldn't render error messages of CV form inputs and sections", () => {
    render(<CVForm activeTemplate="1" initTemplate="1" />);

    errorHolders().all.forEach((el) => expect(el).not.toBeInTheDocument());
  });
});

describe("Submiting The CV Form", () => {
  beforeEach(() => {
    setCurrentErrors({});
  });

  describe("Errors", () => {
    const requiredErrorMessages = {
      projectName: { type: "required", message: "Project Name is required" },
      name: { type: "required", message: "Name is required" },
      jobTitle: { type: "required", message: "job title is required" },
      phoneNumber: { type: "required", message: "Phone Number is required" },
      about: { type: "required", message: "About You is required" },
      education: { type: "required", message: "Education is required" },
      location: { type: "required", message: "Location is required" },
      email: { type: "required", message: "Email is required" },

      skills: { type: "min", message: "you must have at least one skill" },
      projects: { type: "min", message: "you must have at least one project" },
    };

    it("should render error message for required inputs when submit the form with empty inputs", () => {
      const { rerender } = render(<CVForm {...initialProps} />);

      const form = screen.getByRole("form", { name: "CV form" });

      errorHolders().all.forEach((el) => expect(el).not.toBeInTheDocument());

      setCurrentErrors(requiredErrorMessages);
      fireEvent.submit(form);

      // @ts-ignore
      rerender(<CVForm {...initialProps} causeRerender={true} />);

      errorHolders().required.forEach((el) => expect(el).toBeInTheDocument());
      errorHolders().nonRequired.forEach((el) =>
        expect(el).not.toBeInTheDocument()
      );
    });

    it("should render 'please enter a valid <value>' error message when enter invalid values in specific inputs", async () => {
      const { rerender } = render(<CVForm {...initialProps} />);

      const form = screen.getByRole("form", { name: "CV form" });
      const URLInputs = () => {
        return [
          "linkedin profile link",
          "github profile link",
          "Behance profile link",
          "your website link",
        ].map((placeholder) => screen.getByPlaceholderText(placeholder));
      };

      errorHolders().URLInputs.forEach((inp) =>
        expect(inp).not.toBeInTheDocument()
      );

      for (const inp of URLInputs()) {
        await userEvent.type(inp, "invalid url");
      }

      URLInputs().forEach((inp) =>
        expect((inp as HTMLInputElement).value).toBe("invalid url")
      );

      const finalErros = {
        ...URLInputsErrorMessages,
        ...requiredErrorMessages,
      };

      setCurrentErrors(finalErros);

      fireEvent.submit(form);

      // @ts-ignore
      rerender(<CVForm {...initialProps} triggerRerender={true} />);

      const { required, URLInputs: URLInputsErrorMessageHolders } =
        errorHolders();

      const textPattern = new RegExp(
        Object.values(finalErros)
          .map((msg) => (msg as { message: string }).message)
          .join("|")
      );

      [...required, ...URLInputsErrorMessageHolders].forEach((el, i) => {
        expect(el).toBeInTheDocument();
        expect(el).toHaveTextContent(textPattern);
      });
    });
  });

  it("should disable all inputs and buttons in the form while submitting", async () => {
    render(<CVForm {...initialProps} />);

    const allInputs = screen.getAllByRole("textbox");
    const allBtns = screen.getAllByRole("button");
    const form = screen.getByRole("form", { name: "CV form" });
    const fieldset = await screen.findByRole("group");
    const allElements = allInputs.concat(allBtns);

    expect(fieldset).toBeEnabled();
    allElements.forEach((el) => expect(el).toBeEnabled());

    fireEvent.submit(form);

    expect(screen.getByRole("group")).toBeDisabled();
    allInputs.concat(allBtns).forEach((el) => expect(el).toBeDisabled());

    await waitFor(
      () => {
        expect(fieldset).toBeEnabled();
        allInputs.concat(allBtns).forEach((el) => expect(el).toBeEnabled());
      },
      { timeout: 100 }
    );
  });
});

describe("Render AddImage Section Independent On the Template Image Support", () => {
  test.each(Object.entries(templates) as [string, { image: boolean }][])(
    `should render AddImage section with Template: %s`,
    (templateIndex, { image }) => {
      const props = {
        activeTemplate: templateIndex,
        initTemplate: templateIndex,
      } as CVFormProps;

      render(<CVForm {...props} />);
      const addImageSection = screen.queryByTitle("add image to CV section");
      if (image) expect(addImageSection).toBeInTheDocument();
      else expect(addImageSection).not.toBeInTheDocument();
    }
  );
});
