import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// components
import ProjectsSection from "@/app/(allPages)/cv-form/components/form/multiInputSections/sections/ProjectsSection";

// types
import type { InputsTypes } from "@/app/(allPages)/cv-form/page";
import type { Control, UseFormRegister } from "react-hook-form";

// mocks
import useFieldArrayMock from "@/__mocks__/useFieldArrayMock";

jest.mock("react-hook-form", () => {
  const actualReactHookForm = jest.requireActual("react-hook-form");

  return {
    ...actualReactHookForm,
    useFieldArray: () => {
      return useFieldArrayMock();
    },
    useForm: () => ({
      register: jest.fn(),
      control: {
        _getFieldArray: jest.fn(() => ({
          fields: [{ id: "mock-1", skill: "" }],
        })),
        _formState: {},
      },
      formState: { isDirty: false, isValid: true },
    }),
  };
});

describe("Projects Sections In CV Form", () => {
  it("should render initial projects section elements", () => {
    const registerFnMock = jest.fn();

    render(
      <ProjectsSection
        control={{} as unknown as Control<InputsTypes>}
        register={registerFnMock as UseFormRegister<InputsTypes>}
        initialValue={{ name: "", description: "" }}
      />
    );

    const title = screen.getByRole("heading", { name: "Your Projects" });
    const addProjectBtn = screen.getByRole("button", { name: "Add Project" });
    const initNameInput = screen.getByPlaceholderText("project 1 name");
    const initDescriptionInput = screen.getByPlaceholderText(
      "project 1 description"
    );
    const errorMsgHolder = screen.queryByTitle(
      "multi-inputs-section-error-msg-holder"
    );

    expect(title).toBeInTheDocument();
    expect(addProjectBtn).toBeInTheDocument();
    expect(initNameInput).toBeInTheDocument();
    expect(initDescriptionInput).toBeInTheDocument();

    expect(errorMsgHolder).not.toBeInTheDocument();
    expect(registerFnMock).toHaveBeenCalledTimes(2);
  });

  it("should render error message holder", () => {
    const registerFnMock = jest.fn();

    render(
      <ProjectsSection
        control={{} as unknown as Control<InputsTypes>}
        register={registerFnMock as UseFormRegister<InputsTypes>}
        initialValue={{ name: "", description: "" }}
        errorMsg="Testing Error Message feature"
      />
    );

    const errorMsgHolder = screen.queryByTitle(
      "multi-inputs-section-error-msg-holder"
    );

    expect(errorMsgHolder).toBeInTheDocument();
    expect(errorMsgHolder).toHaveTextContent("Testing Error Message feature");
  });

  it("click on 'add project' btn 3 times", async () => {
    const registerFnMock = jest.fn();

    render(
      <ProjectsSection
        control={{} as unknown as Control<InputsTypes>}
        register={registerFnMock as UseFormRegister<InputsTypes>}
        initialValue={{ name: "", description: "" }}
      />
    );

    const addProjectBtn = screen.getByRole("button", { name: "Add Project" });
    const initProject = screen.getAllByRole("listitem");
    expect(initProject).toHaveLength(1);

    await Promise.allSettled(
      Array.from({ length: 3 }).map(() => userEvent.click(addProjectBtn))
    );

    const FinalProjects = screen.getAllByRole("listitem");
    const removeProjectInputBtns = screen.getAllByRole("button", {
      name: "Remove Project",
    });

    expect(FinalProjects).toHaveLength(4);
    expect(removeProjectInputBtns).toHaveLength(3);

    FinalProjects.forEach((_, i) => {
      const initNameInput = screen.getByPlaceholderText(
        `project ${i + 1} name`
      );
      const initDescriptionInput = screen.getByPlaceholderText(
        `project ${i + 1} description`
      );

      expect(initNameInput).toBeInTheDocument();
      expect(initDescriptionInput).toBeInTheDocument();
    });
  });

  it("click on 'add project' btn 3 times then click on remove project btn", async () => {
    const registerFnMock = jest.fn();

    render(
      <ProjectsSection
        control={{} as unknown as Control<InputsTypes>}
        register={registerFnMock as UseFormRegister<InputsTypes>}
        initialValue={{ name: "", description: "" }}
      />
    );

    const addProjectBtn = screen.getByRole("button", { name: "Add Project" });

    await Promise.allSettled(
      Array.from({ length: 3 }).map(() => userEvent.click(addProjectBtn))
    );

    const removeProjectInputBtns = screen.getAllByRole("button", {
      name: "Remove Project",
    });

    await userEvent.click(removeProjectInputBtns[1]);

    const FinalProjects = screen.getAllByRole("listitem");
    expect(FinalProjects).toHaveLength(3);

    FinalProjects.forEach((_, i) => {
      const initNameInput = screen.getByPlaceholderText(
        `project ${i + 1} name`
      );
      const initDescriptionInput = screen.getByPlaceholderText(
        `project ${i + 1} description`
      );

      expect(initNameInput).toBeInTheDocument();
      expect(initDescriptionInput).toBeInTheDocument();
    });
  });
});
