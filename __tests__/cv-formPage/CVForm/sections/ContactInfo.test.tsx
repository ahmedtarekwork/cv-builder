import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// components
import ContactInfo from "@/app/(allPages)/cv-form/components/form/yourInfoSection/sections/ContactInfo";

// types
import type { InputsTypes } from "@/app/(allPages)/cv-form/page";
import type { FieldError, FieldErrors } from "react-hook-form";

describe("CV Form Contact Info Section", () => {
  it("register 3 contact Info inputs", () => {
    const registerFnMock = jest.fn();

    render(
      <ContactInfo
        register={registerFnMock}
        errors={{} as FieldErrors<InputsTypes>}
      />
    );

    expect(registerFnMock).toHaveBeenCalledTimes(3);
  });

  it("render 3 contact inputs", () => {
    render(
      <ContactInfo
        register={jest.fn()}
        errors={{} as FieldErrors<InputsTypes>}
      />
    );

    const inputs = ["location", "your-website-link", "email"];

    inputs.forEach((inp) => {
      const input = screen.getByPlaceholderText(inp.replaceAll("-", " "));
      expect(input).toBeInTheDocument();
    });

    inputs.forEach((inp) => {
      const input = screen.queryByTitle(`${inp}-error-msg-holder`);
      expect(input).not.toBeInTheDocument();
    });
  });

  it("render 3 contact inputs with error messages", () => {
    const inputs = {
      location: "your location is required",
      "your-website-link": "invalid website url",
      email: "email is required",
    };

    render(
      <ContactInfo
        register={jest.fn()}
        errors={{
          email: { message: inputs.email } as FieldError,
          websiteLink: { message: inputs["your-website-link"] } as FieldError,
          location: { message: inputs.location } as FieldError,
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
