import { render, screen } from "@testing-library/react";

// components
import PersonalInfo from "@/app/(allPages)/cv-form/components/form/yourInfoSection/sections/PersonalInfo";

// types
import type { InputsTypes } from "@/app/(allPages)/cv-form/page";
import type { FieldError, FieldErrors } from "react-hook-form";

describe("CV Form Personal Info Section", () => {
  it("register 3 Personal Info inputs", () => {
    const registerFnMock = jest.fn();

    render(
      <PersonalInfo
        register={registerFnMock}
        errors={{} as FieldErrors<InputsTypes>}
      />
    );

    expect(registerFnMock).toHaveBeenCalledTimes(3);
  });

  it("render 3 personal inputs", () => {
    render(
      <PersonalInfo
        register={jest.fn()}
        errors={{} as FieldErrors<InputsTypes>}
      />
    );

    const inputs = ["name", "job-title", "phone-number"];

    inputs.forEach((inp) => {
      const input = screen.getByPlaceholderText(inp.replace("-", " "));
      expect(input).toBeInTheDocument();
    });

    inputs.forEach((inp) => {
      const input = screen.queryByTitle(`${inp}-error-msg-holder`);
      expect(input).not.toBeInTheDocument();
    });
  });

  it("render 3 personal inputs with error messages", () => {
    const inputs = {
      name: "you must provide your name",
      "job-title": "you must provide a job title",
      "phone-number": "you must provide a phone number",
    };

    render(
      <PersonalInfo
        register={jest.fn()}
        errors={{
          jobTitle: { message: inputs["job-title"] } as FieldError,
          name: { message: inputs.name } as FieldError,
          phoneNumber: {
            message: inputs["phone-number"],
          } as FieldError,
        }}
      />
    );

    Object.entries(inputs).forEach(([inp]) => {
      const input = screen.getByPlaceholderText(inp.replace("-", " "));
      expect(input).toBeInTheDocument();
    });

    Object.entries(inputs).forEach(([inp, errorMsg]) => {
      const input = screen.getByTitle(`${inp}-error-msg-holder`);
      expect(input).toBeInTheDocument();
      expect(input).toHaveTextContent(errorMsg);
    });
  });
});
