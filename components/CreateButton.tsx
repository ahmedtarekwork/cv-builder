import type { ComponentProps, ReactNode } from "react";

// components
import { Button } from "./ui/button";

type Props = {
  ButtonTag?: JSX.ElementType;
  children: ReactNode;
} & (ComponentProps<"button"> | any);

const CreateButton = ({ ButtonTag = Button, children, ...attr }: Props) => {
  return <ButtonTag {...attr}>{children}</ButtonTag>;
};
export default CreateButton;
