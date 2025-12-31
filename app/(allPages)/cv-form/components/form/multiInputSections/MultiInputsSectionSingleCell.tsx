// components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// types
import type { InputsSectionListItemProps } from "./InputsSection";
import type { Path } from "react-hook-form";
import type { TemplateDataType } from "../../../page";

type Props = InputsSectionListItemProps & {
  type: "Skill" | "Job";
};

const MultiInputsSectionSingleCell = ({ i, remove, register, type }: Props) => {
  return (
    <li className="flex gap-2 items-center">
      <Input
        placeholder={`${type} ${i + 1}`}
        {...register(
          `${type.toLowerCase()}s.${i}.${type.toLowerCase()}` as Path<TemplateDataType>
        )}
      />

      {i !== 0 && (
        <Button
          className="font-extrabold text-2xl"
          variant="destructive"
          onClick={() => remove(i)}
          type="button"
        >
          -
        </Button>
      )}
    </li>
  );
};
export default MultiInputsSectionSingleCell;
