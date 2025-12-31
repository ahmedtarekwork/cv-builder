import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// components
import SkillsSection from "@/app/(allPages)/cv-form/components/form/multiInputSections/sections/SkillsSection";

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

describe("Skills Sections In CV Form", () => {
  it("should render initial skills section elements", () => {
    const registerFnMock = jest.fn();

    render(
      <SkillsSection
        control={{} as unknown as Control<InputsTypes>}
        register={registerFnMock as UseFormRegister<InputsTypes>}
        initialValue={{ skill: "" }}
      />
    );

    const title = screen.getByRole("heading", { name: "Your Skills" });
    const addSkillBtn = screen.getByRole("button", { name: "Add Skill" });
    const initInput = screen.getByRole("textbox");
    const errorMsgHolder = screen.queryByTitle(
      "multi-inputs-section-error-msg-holder"
    );

    expect(title).toBeInTheDocument();
    expect(addSkillBtn).toBeInTheDocument();
    expect(initInput).toBeInTheDocument();
    expect((initInput as HTMLInputElement).placeholder).toBe("Skill 1");
    expect(errorMsgHolder).not.toBeInTheDocument();
    expect(registerFnMock).toHaveBeenCalledTimes(1);
  });

  it("should render error message holder", () => {
    const registerFnMock = jest.fn();

    render(
      <SkillsSection
        control={{} as unknown as Control<InputsTypes>}
        register={registerFnMock as UseFormRegister<InputsTypes>}
        initialValue={{ skill: "" }}
        errorMsg="Testing Error Message feature"
      />
    );

    const errorMsgHolder = screen.queryByTitle(
      "multi-inputs-section-error-msg-holder"
    );

    expect(errorMsgHolder).toBeInTheDocument();
    expect(errorMsgHolder).toHaveTextContent("Testing Error Message feature");
  });

  it("click on 'add skill' btn 3 times", async () => {
    const registerFnMock = jest.fn();

    render(
      <SkillsSection
        control={{} as unknown as Control<InputsTypes>}
        register={registerFnMock as UseFormRegister<InputsTypes>}
        initialValue={{ skill: "" }}
      />
    );

    const addSkillBtn = screen.getByRole("button", { name: "Add Skill" });
    const initInputs = screen.getAllByRole("textbox");
    expect(initInputs).toHaveLength(1);

    await Promise.allSettled(
      Array.from({ length: 3 }).map(() => userEvent.click(addSkillBtn))
    );

    const FinalInputs = screen.getAllByRole("textbox");
    const removeSkillInputBtns = screen.getAllByRole("button", { name: "-" });

    expect(FinalInputs).toHaveLength(4);
    expect(removeSkillInputBtns).toHaveLength(3);

    FinalInputs.forEach((inp, i) =>
      expect((inp as HTMLInputElement).placeholder).toBe(`Skill ${i + 1}`)
    );
  });

  it("click on 'add skill' btn 3 times then click on remove skill btn", async () => {
    const registerFnMock = jest.fn();

    render(
      <SkillsSection
        control={{} as unknown as Control<InputsTypes>}
        register={registerFnMock as UseFormRegister<InputsTypes>}
        initialValue={{ skill: "" }}
      />
    );

    const addSkillBtn = screen.getByRole("button", { name: "Add Skill" });

    await Promise.allSettled(
      Array.from({ length: 3 }).map(() => userEvent.click(addSkillBtn))
    );

    const removeSkillInputBtns = screen.getAllByRole("button", { name: "-" });

    await userEvent.click(removeSkillInputBtns[1]);

    const FinalInputs = screen.getAllByRole("textbox");
    expect(FinalInputs).toHaveLength(3);

    FinalInputs.forEach((inp, i) =>
      expect((inp as HTMLInputElement).placeholder).toBe(`Skill ${i + 1}`)
    );
  });
});
