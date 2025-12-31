"use client";

// react
import { useState } from "react";

// components
import AddImage, {
  type AddImageProps,
} from "@/app/(allPages)/cv-form/components/form/addImage/AddImage";

const AddImageTestWrapper = (props: Omit<AddImageProps, "setImage">) => {
  const [image, setImage] = useState<File | undefined>(undefined);

  return <AddImage {...props} image={image} setImage={setImage} />;
};
export default AddImageTestWrapper;
