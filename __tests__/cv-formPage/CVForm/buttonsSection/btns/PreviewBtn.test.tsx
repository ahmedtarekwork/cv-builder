import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// components
import PerviewBtn from "@/app/(allPages)/cv-form/components/form/buttonsSection/PerviewBtn";

describe("CV Form Preview Btn", () => {
  it("display trigger btn and hide the dialog", () => {
    const getValuesFnMock = jest.fn();

    render(
      <PerviewBtn
        currentTemplate="1"
        getValues={getValuesFnMock}
        isLoading={false}
      />
    );

    const triggerBtn = screen.getByRole("button");
    const dialog = screen.queryByTitle("preview-CV-dialog");

    expect(dialog).not.toBeInTheDocument();
    expect(triggerBtn).toBeInTheDocument();

    expect(getValuesFnMock).not.toHaveBeenCalled();
  });

  it("open CV preview dialog", async () => {
    const getValuesFnMock = jest.fn();

    render(
      <PerviewBtn
        currentTemplate="1"
        getValues={getValuesFnMock}
        isLoading={false}
      />
    );

    const triggerBtn = screen.getByRole("button");

    await userEvent.click(triggerBtn);

    const dialog = screen.queryByTitle("preview-CV-dialog");

    expect(dialog).toBeInTheDocument();

    expect(getValuesFnMock).toHaveBeenCalledTimes(1);
  });

  it("close CV preview dialog", async () => {
    const getValuesFnMock = jest.fn();

    render(
      <PerviewBtn
        currentTemplate="1"
        getValues={getValuesFnMock}
        isLoading={false}
      />
    );

    const triggerBtn = screen.getByRole("button");

    await userEvent.click(triggerBtn);

    const closeBtn = screen.getByRole("button", { name: "X" });
    const dialog = screen.getByTitle("preview-CV-dialog");

    expect(dialog).toBeInTheDocument();
    expect(getValuesFnMock).toHaveBeenCalledTimes(1);

    await userEvent.click(closeBtn);

    expect(closeBtn).not.toBeInTheDocument();
    expect(dialog).not.toBeInTheDocument();
  });
});
