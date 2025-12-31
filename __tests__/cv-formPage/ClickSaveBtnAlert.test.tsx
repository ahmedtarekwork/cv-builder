import { render, screen } from "@testing-library/react";

import ClickSaveBtnAlert from "@/app/(allPages)/cv-form/components/ClickSaveBtnAlert";

describe("Click Save Btn Alert", () => {
  it("must disappear in create new CV mode", () => {
    render(<ClickSaveBtnAlert isEditMode={false} />);

    const alert = screen.queryByRole("alert");

    expect(alert).not.toBeInTheDocument();
  });

  it("check all items in alert appears in create edit CV mode", () => {
    render(<ClickSaveBtnAlert isEditMode />);

    const alert = screen.getByRole("alert");
    const icon = screen.getByTitle("exclamation-icon");
    const title = screen.getByRole("heading");
    const description = screen.getByTitle("alert description");

    [alert, icon, title, description].forEach((el) =>
      expect(el).toBeInTheDocument()
    );
  });
});
