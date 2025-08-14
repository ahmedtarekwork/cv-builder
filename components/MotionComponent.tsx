"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion, type MotionProps } from "framer-motion";

type Props<Tag extends keyof JSX.IntrinsicElements> = {
  children?: ReactNode;
  TagName: Tag;
} & ComponentProps<Tag> &
  MotionProps;
const MotionComponent = <Tag extends keyof JSX.IntrinsicElements>({
  children,
  TagName,
  ...attr
}: Props<Tag>) => {
  const Element = motion[TagName as keyof typeof motion];
  return <Element {...(attr as MotionProps)}>{children}</Element>;
};
export default MotionComponent;
