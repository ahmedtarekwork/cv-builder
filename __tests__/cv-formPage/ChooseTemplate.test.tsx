import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import ChooseTemplate from "@/app/(allPages)/cv-form/components/ChooseTemplate";

import templates from "@/components/templates";

describe("choose CV template", () => {
  const openDialog = async () => {
    const dialogTrigger = screen.getByRole("button", {
      name: "Change Template",
    });

    await userEvent.click(dialogTrigger);
  };

  it("choose CV template dialog trigger button displayed", () => {
    render(<ChooseTemplate activeTemplate="1" setActiveTemplate={jest.fn()} />);

    const dialogTrigger = screen.getByRole("button", {
      name: "Change Template",
    });

    expect(dialogTrigger).toBeInTheDocument();
  });

  it("click on close button of choose CV templates dialog", async () => {
    render(<ChooseTemplate activeTemplate="1" setActiveTemplate={jest.fn()} />);

    await openDialog();

    const closeBtn = screen.getByTestId("close-cv-templates-dialog-btn");

    await userEvent.click(closeBtn);

    const dialog = screen.queryByTestId("choose-template-dialog");

    expect(dialog).not.toBeInTheDocument();
  });

  it("click on the trigger button of choose CV templates dialog", async () => {
    render(<ChooseTemplate activeTemplate="1" setActiveTemplate={jest.fn()} />);

    await openDialog();

    const dialog = screen.queryByTestId("choose-template-dialog");
    const templatesList = screen.getAllByRole("choose-template-btn");

    expect(dialog).toBeInTheDocument();
    expect(templatesList).toHaveLength(Object.keys(templates).length);
  });

  it("click on a template inside the dialog", async () => {
    const setTemplateMock = jest.fn();
    render(
      <ChooseTemplate activeTemplate="1" setActiveTemplate={setTemplateMock} />
    );

    await openDialog();

    const dialog = screen.queryByTestId("choose-template-dialog");
    const firstTemplate = screen.getAllByRole("choose-template-btn")[0];

    await userEvent.click(firstTemplate);

    expect(dialog).not.toBeInTheDocument();
    expect(setTemplateMock).toHaveBeenCalledTimes(1);
  });
});
