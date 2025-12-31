// testing
import { render } from "@testing-library/react";

// components
import Profiles from "@/app/(allPages)/cv-form/components/form/yourInfoSection/sections/Profiles";

export type TestProfileUrlValidationParams = Record<
  "suiteName" | "fieldName" | "errorMessage",
  string
> &
  Record<"validUrls" | "invalidUrls", string[]>;

const testProfileUrlValidation = ({
  suiteName,
  fieldName,
  validUrls,
  invalidUrls,
  errorMessage,
}: TestProfileUrlValidationParams) => {
  describe(`validate the ${suiteName} profile URL input values`, () => {
    const mockRegister = jest.fn((name, options) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
      options,
    }));

    render(<Profiles register={mockRegister} errors={{}} />);

    const registerCall = mockRegister.mock.calls.find(
      (call) => call[0] === fieldName
    );

    if (!registerCall) {
      throw new Error(`register for ${fieldName} not called`);
    }

    const { validate } = registerCall[1];

    test.each(validUrls)(`should validate URL: %s`, (url) => {
      expect(validate(url)).toBe(true);
    });

    test.each(invalidUrls)(`should invalidate URL: %s`, (url) => {
      expect(validate(url)).toBe(errorMessage);
    });
  });
};
export default testProfileUrlValidation;
