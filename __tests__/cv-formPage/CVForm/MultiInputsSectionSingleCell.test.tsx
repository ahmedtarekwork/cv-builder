import { render, screen } from "@testing-library/react";

// components
import MultiInputsSectionSingleCell from "@/app/(allPages)/cv-form/components/form/multiInputSections/MultiInputsSectionSingleCell";
import userEvent from "@testing-library/user-event";

describe("Multible Inputs Sections In the CV Form", () => {
  it("render the main elements without 'remove item' btn", () => {
    const registerMockFn = jest.fn();

    render(
      <MultiInputsSectionSingleCell
        i={0}
        register={registerMockFn}
        remove={jest.fn()}
        type="Skill"
      />
    );

    const input = screen.getByRole("textbox");
    const removeBtn = screen.queryByRole("button");

    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).placeholder).toBe("Skill 1");
    expect(removeBtn).not.toBeInTheDocument();
    expect(registerMockFn).toHaveBeenCalledTimes(1);
  });

  it("click on the 'remove item' btn", async () => {
    const removeMockFn = jest.fn();

    render(
      <MultiInputsSectionSingleCell
        i={1}
        register={jest.fn()}
        remove={removeMockFn}
        type="Skill"
      />
    );

    const removeBtn = screen.getByRole("button");

    await userEvent.click(removeBtn);

    expect(removeMockFn).toHaveBeenCalledTimes(1);
  });
});
