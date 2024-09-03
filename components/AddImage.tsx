"use client";

// nextjs
import Image from "next/image";

// react
import {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,

  // types
  type Dispatch,
  type SetStateAction,
} from "react";

// components
// shadcn
import { Button } from "./ui/button";

// icons
import { TbTrashXFilled } from "react-icons/tb";

type Props = {
  image: null | File;
  setImage: Dispatch<SetStateAction<Props["image"]>>;
  initImgSrc?: string;
};

type DeleteImgBtnProps = {
  setError: Dispatch<SetStateAction<string>>;
  setImage: Props["setImage"];
  setShowImg: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement>;
};

export type AddImageRefType = {
  setShowImg: Dispatch<SetStateAction<boolean>>;
  showImg: boolean;
};

const DeleteImgBtn = ({
  setError,
  setImage,
  setShowImg,
  inputRef,
}: DeleteImgBtnProps) => {
  return (
    <Button
      variant="destructive"
      onClick={() => {
        setError("");
        setImage(null);
        setShowImg(false);
        if (inputRef.current) inputRef.current.value = "";
      }}
      type="button"
      className="flex items-center justify-center gap-2 w-full flex-wrap"
      style={{
        height: "unset",
      }}
    >
      <TbTrashXFilled size={25} />
      Delete Your Image
    </Button>
  );
};

const AddImage = forwardRef<AddImageRefType, Props>(
  ({ image, setImage, initImgSrc }, ref) => {
    const [error, setError] = useState("");
    const [showImg, setShowImg] = useState(true);

    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({ setShowImg, showImg }), [showImg]);

    return (
      <div className="space-y-3 border-2 rounded-md border-primary p-3 flex-1">
        {(image || (initImgSrc && showImg)) && (
          <Image
            className="mx-auto"
            src={image ? URL.createObjectURL(image) : initImgSrc || ""}
            alt="your image"
            width={210}
            height={210}
            style={{ objectFit: "contain", aspectRatio: 1 }}
          />
        )}

        <input
          ref={inputRef}
          accept="image/*"
          type="file"
          className="hidden"
          id="image-input"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];

            if (
              ["jpeg", "jpg", "png"].every((type) => !file?.type.endsWith(type))
            ) {
              setError("only support .png and .jpg image formats");
            } else {
              if (file) {
                setImage(file);
                if (error) setError("");
              }
            }
          }}
        />

        <Button asChild className="w-full cursor-pointer">
          <label htmlFor="image-input">
            {image || initImgSrc ? "Change" : "Add"} Your Image
          </label>
        </Button>

        {!image && initImgSrc && showImg && (
          <DeleteImgBtn
            setError={setError}
            setImage={setImage}
            setShowImg={setShowImg}
            inputRef={inputRef}
          />
        )}

        {image && (
          <>
            <DeleteImgBtn
              setError={setError}
              setImage={setImage}
              setShowImg={setShowImg}
              inputRef={inputRef}
            />

            {initImgSrc && (
              <Button
                type="button"
                className="w-full"
                variant="destructive"
                onClick={() => {
                  setError("");
                  setImage(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
              >
                Reset Your Image
              </Button>
            )}
          </>
        )}

        {error && <p className="text-destructive">{error}</p>}
      </div>
    );
  }
);
AddImage.displayName = "AddImage";
export default AddImage;
