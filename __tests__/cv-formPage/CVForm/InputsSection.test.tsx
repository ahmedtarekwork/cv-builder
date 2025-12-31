import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// components
import InputsSection from "@/app/(allPages)/cv-form/components/form/multiInputSections/InputsSection";

// mocks
import useFieldArrayMock from "@/__mocks__/useFieldArrayMock";

// types
import type { Control } from "react-hook-form";
import type { InputsTypes } from "@/app/(allPages)/cv-form/page";

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

describe("Inputs Section Component, Implemented In the CV Form", () => {
  it("render main elements", () => {
    render(
      <InputsSection
        control={{} as unknown as Control<InputsTypes>}
        ListItem={(fieldId) => <li key={fieldId}>Hello World</li>}
        addBtnContent="add"
        initialValue={{ skill: "" }}
        name="name"
        title="The Title"
      />
    );

    const title = screen.getByRole("heading", { name: "The Title" });
    const initItems = screen.getAllByRole("listitem");
    const addNewItemBtn = screen.getByRole("button", { name: "add" });
    const errorMsgHolder = screen.queryByTitle(
      "multi-inputs-section-error-msg-holder"
    );

    expect(errorMsgHolder).not.toBeInTheDocument();

    expect(initItems).toHaveLength(1);

    [title, addNewItemBtn].forEach((el) => expect(el).toBeInTheDocument());
  });

  it("render error message holder", () => {
    render(
      <InputsSection
        control={{} as unknown as Control<InputsTypes>}
        ListItem={(fieldId) => <li key={fieldId}>Hello World</li>}
        addBtnContent="add"
        initialValue={{ skill: "" }}
        name="name"
        title="The Title"
        errorMsg="This is an error"
      />
    );

    const errorMsgHolder = screen.queryByTitle(
      "multi-inputs-section-error-msg-holder"
    );

    expect(errorMsgHolder).toBeInTheDocument();
    expect(errorMsgHolder).toHaveTextContent("This is an error");
  });

  it("click on 'add item' btn 6 times", async () => {
    render(
      <InputsSection
        control={{} as unknown as Control<InputsTypes>}
        ListItem={(fieldId) => <li key={fieldId}>Hello World</li>}
        addBtnContent="add"
        initialValue={{ skill: "" }}
        name="name"
        title="The Title"
      />
    );

    const initItem = screen.getAllByRole("listitem");
    const addNewItemBtn = screen.getByRole("button", { name: "add" });

    expect(initItem).toHaveLength(1);

    await Promise.allSettled(
      Array.from({ length: 5 }).map(() => userEvent.click(addNewItemBtn))
    );

    const FinalItems = screen.getAllByRole("listitem");
    expect(FinalItems).toHaveLength(6);
  });

  it("click on 'add item' btn 6times then remove two items by clicking on 'remove item' btn", async () => {
    render(
      <InputsSection
        control={{} as unknown as Control<InputsTypes>}
        ListItem={(fieldId, i, remove) => (
          <li key={fieldId}>
            <button onClick={() => remove(i)}>remove item</button>
          </li>
        )}
        addBtnContent="add"
        initialValue={{ skill: "" }}
        name="name"
        title="The Title"
      />
    );

    const addNewItemBtn = screen.getByRole("button", { name: "add" });

    await Promise.allSettled(
      Array.from({ length: 5 }).map(() => userEvent.click(addNewItemBtn))
    );

    const ItemsBtns = screen
      .getAllByRole("button", { name: "remove item" })
      .slice(0, 2);

    await Promise.allSettled(ItemsBtns.map((btn) => userEvent.click(btn)));

    const FinalItems = screen.getAllByRole("listitem");
    expect(FinalItems).toHaveLength(4);
  });
});
