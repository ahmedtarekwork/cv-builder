"use client";

// react
import type { ReactNode } from "react";

import {
  // hooks
  useFieldArray,

  // types
  type Control,
  type FieldValues,
  type ArrayPath,
  type FieldArray,
  type UseFieldArrayRemove,
  type UseFormRegister,
} from "react-hook-form";

// components
// shadcn
import { Button } from "@/components/ui/button";

// types
import type { InputsTypes } from "../../../page";
import type { Job, Project, Skill } from "@/lib/types";

type Props<T extends FieldValues> = {
  control: Control<T, any>;
  name: string;
  title: string;
  addBtnContent: string;
  initialValue: Record<string, string>;
  ListItem: (
    fieldId: string,
    i: number,
    remove: UseFieldArrayRemove
  ) => ReactNode;
  errorMsg?: string;
};

type RegisterFn = UseFormRegister<InputsTypes>;

export type InputsSectionListItemProps = {
  i: number;
  remove: UseFieldArrayRemove;
  register: RegisterFn;
};

export type SectionsProps<T extends Job | Skill | Project> = {
  control: Control<InputsTypes, unknown>;
  register: RegisterFn;
  errorMsg?: string;
  initialValue: T;
};

const InputsSection = <T extends FieldValues>({
  control,
  name,
  title,
  addBtnContent,
  initialValue,
  ListItem,
  errorMsg,
}: Props<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as ArrayPath<T>,
  });

  return (
    <div
      aria-label={name}
      className="bg-white space-y-4 border-2 rounded-md border-primary p-3 flex-1 flex flex-col"
    >
      <h3 className="text-secondary font-semibold text-xl">{title}</h3>

      <ul className="space-y-4 inputs-section-list">
        {fields.map((field, i) => ListItem(field.id, i, remove))}
      </ul>

      <div className="!mt-auto pt-4">
        <Button
          className="w-full"
          onClick={() => append(initialValue as FieldArray<T, ArrayPath<T>>)}
          type="button"
        >
          {addBtnContent}
        </Button>
      </div>

      {errorMsg && (
        <p
          data-testid={`${name}-multi-inputs-section-error-msg-holder`}
          title="multi-inputs-section-error-msg-holder"
          className="text-destructive"
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
};
export default InputsSection;
