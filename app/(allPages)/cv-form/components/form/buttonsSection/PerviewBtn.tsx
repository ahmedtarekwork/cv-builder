// react
import { useState } from "react";

// components
// shadcn
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// icons
import { FaEye } from "react-icons/fa6";

// templates
import templates from "@/components/templates";

// types
import type { BtnsSectionProps } from "./ButtontsSection";
import type { TemplateDataType } from "../../../page";

const PerviewBtn = ({
  currentTemplate,
  getValues,
  image,
  initImage,
}: Pick<
  BtnsSectionProps,
  "currentTemplate" | "getValues" | "image" | "initImage"
>) => {
  const PreviewTemplate = templates[currentTemplate].template;
  const [open, setOpen] = useState(false);
  const [previewData, setPreviewData] = useState({});

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (isOpen) setPreviewData(getValues());
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* disabled={isLoading} */}
      <Button className="flex gap-2" type="button" asChild>
        <DialogTrigger>
          <FaEye size={25} />
          Final Preview
        </DialogTrigger>
      </Button>
      <DialogContent title="preview-CV-dialog" className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle
            title="cv-preview-dialog-header"
            className="flex items-center justify-between gap-4 flex-wrap w-full"
          >
            <p className="title w-fit">CV Preview</p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <DialogClose data-testid="close-cv-templates-dialog-btn">
                X
              </DialogClose>
            </Button>
          </DialogTitle>

          <DialogDescription className="!mt-4">
            <div className="min-h-[842px] w-[595px] the-shadow mx-auto mt-4 flex flex-col">
              <PreviewTemplate
                templateData={{
                  ...(previewData as TemplateDataType),
                  imgSrc: image ? URL.createObjectURL(image) : initImage?.img,
                }}
                dummy={false}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default PerviewBtn;
