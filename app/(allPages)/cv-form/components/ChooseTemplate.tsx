"use client";

// react
import { useState, type Dispatch, type SetStateAction } from "react";

// templates
import templates from "@/components/templates";

// shadcn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

type Props = {
  activeTemplate: keyof typeof templates;
  setActiveTemplate: Dispatch<SetStateAction<keyof typeof templates>>;
};

const ChooseTemplate = ({ activeTemplate, setActiveTemplate }: Props) => {
  const [open, setOpen] = useState(false);

  const TemplateComponent = templates[activeTemplate].template;

  return (
    <div className="bg-white flex justify-between items-center gap-6 max-sm:flex-col max-sm:justify-center the-shadow p-4 rounded-md mb-4">
      <div className="h-[150px] rounded-sm overflow-hidden border-2 border-slate-400 max-w-full w-[150px]">
        <TemplateComponent dummy={true} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <Button asChild>
          <DialogTrigger>Change Template</DialogTrigger>
        </Button>

        <DialogContent
          data-testid="choose-template-dialog"
          className="[&>button]:hidden"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between gap-6 flex-wrap w-full">
              <p className="w-fit title">Choose a template</p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <DialogClose data-testid="close-cv-templates-dialog-btn">
                  X
                </DialogClose>
              </Button>
            </DialogTitle>

            <DialogDescription className="!mt-4 space-y-4">
              {Object.entries(templates).map(([key, data], i) => {
                const { template: Template } = data;

                return (
                  <button
                    key={i}
                    className="transition hover:the-shadow hover:scale-[1.02] w-full rounded-sm overflow-hidden border-2 border-slate-400 max-w-[1000px] mx-auto block"
                    onClick={() => {
                      setActiveTemplate(key as any);
                      setOpen(false);
                    }}
                    role="choose-template-btn"
                  >
                    <Template dummy={false} ActiveDummyInSmallScreens />
                  </button>
                );
              })}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ChooseTemplate;
