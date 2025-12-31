import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// components
import ResetBtn from "@/app/(allPages)/cv-form/components/form/buttonsSection/ResetBtn";
import CVForm from "@/app/(allPages)/cv-form/components/form/CVForm";

// types
import type { RefObject } from "react";
import type { AddImageRefType } from "@/app/(allPages)/cv-form/components/form/addImage/AddImage";
import type { Job } from "@/lib/types";
import type {
  InputsTypes,
  TemplateDataType,
} from "@/app/(allPages)/cv-form/page";

jest.mock("react-hook-form", () => {
  const actual = jest.requireActual("react-hook-form");
  return {
    __esModule: true,
    ...actual,
  };
});

describe("CV Form Reset Btn", () => {
  it("display reset btn", () => {
    const resetFnMock = jest.fn();
    const setImageFnMock = jest.fn();

    render(
      <ResetBtn
        addImageRef={{} as RefObject<AddImageRefType>}
        initJob={{} as Job}
        isEditMode={false}
        reset={resetFnMock}
        setImage={setImageFnMock}
      />
    );

    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
  });

  it("click on reset btn in create new CV mode", async () => {
    const resetFnMock = jest.fn();
    const setImageFnMock = jest.fn();
    const setShowImgFnMock = jest.fn();

    render(
      <ResetBtn
        addImageRef={
          {
            current: {
              setShowImg: setShowImgFnMock,
            } as unknown as AddImageRefType,
          } as RefObject<AddImageRefType>
        }
        initJob={{} as Job}
        isEditMode={false}
        reset={resetFnMock}
        setImage={setImageFnMock}
      />
    );

    const btn = screen.getByRole("button");

    await userEvent.click(btn);

    expect(resetFnMock).toHaveBeenCalled();
    expect(setImageFnMock).not.toHaveBeenCalled();
    expect(setShowImgFnMock).not.toHaveBeenCalled();
  });

  it("click on the reset btn in edit existing CV mode", async () => {
    const resetFnMock = jest.fn();
    const setImageFnMock = jest.fn();
    const setShowImgFnMock = jest.fn();

    render(
      <ResetBtn
        addImageRef={
          {
            current: {
              setShowImg: setShowImgFnMock,
            } as unknown as AddImageRefType,
          } as RefObject<AddImageRefType>
        }
        initJob={{} as Job}
        isEditMode
        reset={resetFnMock}
        setImage={setImageFnMock}
        initData={{} as TemplateDataType}
      />
    );

    const btn = screen.getByRole("button");

    await userEvent.click(btn);

    [resetFnMock, setImageFnMock, setShowImgFnMock].forEach((fn) =>
      expect(fn).toHaveBeenCalled()
    );
  });
});

describe("Integrate Reset Button With The CV Form", () => {
  it("should reset form when reset button is clicked", async () => {
    render(<CVForm activeTemplate="1" initTemplate="1" />);

    const allTextInputs = screen.getAllByRole("textbox");
    const resetBtn = screen.getByRole("button", { name: "Reset" });

    for (const input of allTextInputs) {
      if ((input as HTMLInputElement).value) {
        await userEvent.clear(input);
      }

      await userEvent.type(input, "testing text");
    }

    allTextInputs.forEach((input) => expect(input).toHaveValue("testing text"));

    await userEvent.click(resetBtn);

    allTextInputs.forEach((input) => {
      if ((input as HTMLInputElement).placeholder === "Project Name")
        expect(input).toHaveValue("untitled");
      else expect(input).toHaveValue("");
    });
  });

  it("should reset form to initial values when reset button is clicked in edit mode", async () => {
    const TEST_TEXT = "test text";
    const PHONE_NUMBER_INIT_VALUE = "01010101011";
    const textInputs = [
      "name",
      "jobTitle",
      "location",
      "about",
      "education",
      "projectName",
    ];
    const urlInputs = [
      "linkedinLink",
      "githubLink",
      "BehanceLink",
      "websiteLink",
    ];

    const initData = {
      projects: [
        {
          description: TEST_TEXT,
          name: TEST_TEXT,
        },
      ],
      skills: [{ skill: TEST_TEXT }],
      jobs: [{ job: TEST_TEXT }],
      ...Object.fromEntries(
        [...textInputs, ...urlInputs].map((name) => [name, TEST_TEXT])
      ),
      email: TEST_TEXT,
      phoneNumber: PHONE_NUMBER_INIT_VALUE,
    } as InputsTypes;

    render(
      <CVForm
        activeTemplate="1"
        initTemplate="1"
        isEditMode
        initImage={{ id: "test-1", img: "https://placehold.co/400x300" }}
        initData={initData}
      />
    );

    const allTextInputs = screen.getAllByRole("textbox");
    const resetBtn = screen.getByRole("button", { name: "Reset" });
    const phoneNumberInput = screen.getByRole("spinbutton", {
      name: "phoneNumber",
    });

    const checkDefaultValues = () => {
      expect(phoneNumberInput).toHaveValue(+PHONE_NUMBER_INIT_VALUE);

      allTextInputs.forEach((inp) => {
        const initDataKey = (inp as HTMLInputElement).name as keyof Omit<
          typeof initData,
          "projects" | "skills" | "jobs" | "phoneNumber"
        >;

        if (!(initDataKey in initData)) {
          const inputPlaceholder = (inp as HTMLInputElement).placeholder;

          switch (inputPlaceholder) {
            case "Skill": {
              const expectedValue = initData["skills"][0].skill;
              expect(inp).toHaveValue(expectedValue);
              break;
            }

            case "jobs": {
              const expectedValue = initData["jobs"][0].job;
              expect(inp).toHaveValue(expectedValue);
              break;
            }

            case "project 1 name": {
              const expectedValue = initData["projects"][0].name;
              expect(inp).toHaveValue(expectedValue);
              break;
            }
            case "project 1 description": {
              const expectedValue = initData["projects"][0].description;
              expect(inp).toHaveValue(expectedValue);
              break;
            }
          }

          return;
        }

        const expectedValue = initData[initDataKey];
        expect(inp).toHaveValue(expectedValue);
      });
    };

    checkDefaultValues();

    for (const input of allTextInputs) {
      if ((input as HTMLInputElement).value) {
        await userEvent.clear(input);
      }

      await userEvent.type(input, TEST_TEXT);
    }

    allTextInputs.forEach((input) => expect(input).toHaveValue(TEST_TEXT));

    await userEvent.click(resetBtn);

    checkDefaultValues();
  });
});
