import { render, screen } from "@testing-library/react";

// components
import SummaryAndEducation from "@/app/(allPages)/cv-form/components/form/yourInfoSection/sections/SummaryAndEducation";

// types
import type { InputsTypes } from "@/app/(allPages)/cv-form/page";
import type { FieldError, FieldErrors } from "react-hook-form";

describe("CV Form Summary And Education Section", () => {
  it("register 2 textarea fields", () => {
    const registerFnMock = jest.fn();

    render(
      <SummaryAndEducation
        register={registerFnMock}
        errors={{} as FieldErrors<InputsTypes>}
      />
    );

    expect(registerFnMock).toHaveBeenCalledTimes(2);
  });

  it("render 2 textare fields", () => {
    render(
      <SummaryAndEducation
        register={jest.fn()}
        errors={{} as FieldErrors<InputsTypes>}
      />
    );

    const inputs = ["About-You", "Education"];

    inputs.forEach((inp) => {
      const input = screen.getByPlaceholderText(inp.replaceAll("-", " "));
      expect(input).toBeInTheDocument();
    });

    inputs.forEach((inp) => {
      const input = screen.queryByTitle(`${inp}-error-msg-holder`);
      expect(input).not.toBeInTheDocument();
    });
  });

  it("render 3 profile inputs with error messages", () => {
    const inputs = {
      "About-You": "type something about your self",
      Education: "your education info is required",
    };

    render(
      <SummaryAndEducation
        register={jest.fn()}
        errors={{
          about: {
            message: inputs["About-You"],
          } as FieldError,
          education: {
            message: inputs["Education"],
          } as FieldError,
        }}
      />
    );

    Object.entries(inputs).forEach(([inp]) => {
      const input = screen.getByPlaceholderText(inp.replaceAll("-", " "));
      expect(input).toBeInTheDocument();
    });

    Object.entries(inputs).forEach(([inp, errorMsg]) => {
      const input = screen.getByTitle(`${inp}-error-msg-holder`);
      expect(input).toBeInTheDocument();
      expect(input).toHaveTextContent(errorMsg);
    });
  });
});
