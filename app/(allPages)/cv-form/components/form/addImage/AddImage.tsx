"use client";

// nextjs
import Image from "next/image";

// react
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,

  // types
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

// components
import DeleteImgBtn from "./DeleteImgBtn";

// shadcn
import { Button } from "@/components/ui/button";

export type AddImageProps = {
  image?: File;
  setImage: Dispatch<SetStateAction<AddImageProps["image"]>>;
  initImgSrc?: string;
  isLoading: boolean;
};

export type AddImageRefType = {
  setShowImg: Dispatch<SetStateAction<boolean>>;
  showImg: boolean;
};

const AddImage = forwardRef<AddImageRefType, AddImageProps>(
  ({ image, setImage, initImgSrc, isLoading }, ref) => {
    const [error, setError] = useState("");
    const [showImg, setShowImg] = useState(true);

    const inputRef = useRef<HTMLInputElement>(null);

    const handlePreviewImg = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];

      if (["jpeg", "jpg", "png"].every((type) => !file?.type.endsWith(type))) {
        setError("only support .png and .jpg image formats");
      } else {
        if (file) {
          setImage(file);
          if (error) setError("");
        }
      }
    };

    const handleRemoveImg = (type: "reset" | "delete") => {
      setError("");
      setImage(undefined);
      setShowImg(type === "reset");
      if (inputRef.current) inputRef.current.value = "";
    };

    useImperativeHandle(ref, () => ({ setShowImg, showImg }), [showImg]);

    return (
      <div
        title="add image to CV section"
        className="bg-white space-y-3 border-2 rounded-md border-primary p-3 flex-1"
      >
        {(image || (initImgSrc && showImg)) && (
          <Image
            className="mx-auto object-contain aspect-[1]"
            src={image ? URL.createObjectURL(image) : initImgSrc || ""}
            alt="your image"
            width={210}
            height={210}
          />
        )}

        <input
          disabled={isLoading}
          ref={inputRef}
          accept="image/*"
          type="file"
          className="hidden"
          id="image-input"
          onChange={handlePreviewImg}
          title="set-cv-image-input"
        />

        <Button
          asChild
          className="w-full cursor-pointer"
          aria-disabled={isLoading}
        >
          <label htmlFor="image-input">
            {image || (initImgSrc && showImg) ? "Change" : "Add"} Your Image
          </label>
        </Button>

        {!image && initImgSrc && showImg && (
          <DeleteImgBtn handleRemoveImg={handleRemoveImg} />
        )}

        {image && (
          <>
            <DeleteImgBtn handleRemoveImg={handleRemoveImg} />

            {initImgSrc && (
              <Button
                type="button"
                className="w-full"
                variant="destructive"
                onClick={() => handleRemoveImg("reset")}
              >
                Reset Your Image
              </Button>
            )}
          </>
        )}

        {error && (
          <p
            title="add image error message holder"
            className="text-destructive"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
AddImage.displayName = "AddImage";
export default AddImage;
