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
  type FieldArrayWithId,
  type UseFieldArrayRemove,
} from "react-hook-form";

// components
// shadcn
import { Button } from "./ui/button";

type Props<T extends FieldValues> = {
  control: Control<T, any>;
  name: string;
  title: string;
  addBtnContent: string;
  initialValue: Record<string, string>;
  ListItem: (
    field: FieldArrayWithId<T, ArrayPath<T>, "id">,
    i: number,
    remove: UseFieldArrayRemove
  ) => ReactNode;
  errorMsg?: string;
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
    <div className="space-y-4 border-2 rounded-md border-primary p-3 flex-1 flex flex-col">
      <h3 className="text-secondary font-semibold text-xl">{title}</h3>

      <ul className="space-y-4 inputs-section-list">
        {fields.map((field, i) => ListItem(field, i, remove))}
      </ul>

      <div className="!mt-auto  pt-4">
        <Button
          className="w-full"
          onClick={() => append(initialValue as FieldArray<T, ArrayPath<T>>)}
          type="button"
        >
          {addBtnContent}
        </Button>
      </div>

      {errorMsg && <p className="text-destructive">{errorMsg}</p>}
    </div>
  );
};
export default InputsSection;
