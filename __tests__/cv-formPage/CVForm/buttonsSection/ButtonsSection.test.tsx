import { render, screen } from "@testing-library/react";

// components
import ButtontsSection from "@/app/(allPages)/cv-form/components/form/buttonsSection/ButtontsSection";

// types
import type { RefObject } from "react";
import type { AddImageRefType } from "@/app/(allPages)/cv-form/components/form/addImage/AddImage";
import type { Job } from "@/lib/types";

describe("CV Form Buttons Section", () => {
  it("render 3 buttons", () => {
    render(
      <ButtontsSection
        isEditMode={false}
        setImage={jest.fn()}
        addImageRef={{} as RefObject<AddImageRefType>}
        initJob={{} as Job}
        reset={jest.fn()}
        getValues={jest.fn()}
        isLoading={false}
        currentTemplate="1"
      />
    );

    const buttonsList = screen.getAllByRole("button");
    const spinner = screen.queryByTitle("spinner");

    expect(spinner).not.toBeInTheDocument();
    expect(buttonsList).toHaveLength(3);

    buttonsList.forEach((btn) => expect(btn).toBeEnabled());
  });
});
