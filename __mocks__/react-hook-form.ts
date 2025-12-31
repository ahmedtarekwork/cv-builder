import type {
  FieldErrors,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import type { InputsTypes } from "@/app/(allPages)/cv-form/page";

let currentErrors: FieldErrors<InputsTypes> = {};

export const setCurrentErrors = (errors: FieldErrors<InputsTypes>) => {
  currentErrors = errors;
};

export const useForm = () =>
  ({
    register: jest.fn((name) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    })),
    handleSubmit: jest.fn((onValid, onInvalid) => (event: any) => {
      event?.preventDefault?.();
      if (Object.keys(currentErrors).length > 0) {
        onInvalid?.(currentErrors);
      } else {
        onValid?.({});
      }
    }),
    formState: {
      get errors() {
        return currentErrors;
      },
    },
    getValues: jest.fn((field?: keyof InputsTypes) => {
      const values = {
        skills: [{ skill: "" }],
        projects: [{ name: "", description: "" }],
        jobs: [{ job: "" }],
      } as InputsTypes;
      return field ? values[field] : values;
    }),
    control: {
      _getFieldArray: jest.fn(() => ({
        fields: [],
      })),
    },
    setError: jest.fn((name: keyof InputsTypes, error) => {
      currentErrors = { ...currentErrors, [name]: error };
    }),
    setValue: jest.fn(),
    reset: jest.fn(),
  } as unknown as UseFormReturn<InputsTypes>);

export const useFieldArray = () =>
  ({
    fields: [{ id: "mock-field-1" }],
    append: jest.fn(),
    remove: jest.fn(),
  } as unknown as UseFieldArrayReturn<InputsTypes>);
