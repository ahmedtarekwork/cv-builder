import { render, screen } from "@testing-library/react";

// components
import ProjectName from "@/app/(allPages)/cv-form/components/form/ProjectName";

// types
import type { FieldError, FieldErrors } from "react-hook-form";
import type { InputsTypes } from "@/app/(allPages)/cv-form/page";

describe("CV Form Project Name Section displayed elements", () => {
  it("Project Name title and Input displayed", () => {
    render(
      <ProjectName
        errors={{} as FieldErrors<InputsTypes>}
        register={jest.fn()}
      />
    );

    const title = screen.getByRole("heading", { name: "Project Name" });
    const input = screen.getByPlaceholderText("Project Name");
    const errorMsgHolder = screen.queryByTestId(
      "project-name-error-msg-holder"
    );

    expect(title).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(errorMsgHolder).not.toBeInTheDocument();
  });

  it("Project Name error message container displayed", () => {
    const errorMsg = "Project must have a name";

    render(
      <ProjectName
        errors={{
          projectName: { message: errorMsg } as FieldError,
        }}
        register={jest.fn()}
      />
    );

    const errorMsgHolder = screen.queryByTestId(
      "project-name-error-msg-holder"
    );

    expect(errorMsgHolder).toBeInTheDocument();
    expect(errorMsgHolder).toHaveTextContent(errorMsg);
  });
});
