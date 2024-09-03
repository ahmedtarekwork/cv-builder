"use client";

// react
import { useState, type Dispatch, type SetStateAction } from "react";

// templates
import templates from "./templates";

// components
import CreateButton from "./CreateButton";

// shadcn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

type Props = {
  template: keyof typeof templates;
  setTemplate: Dispatch<SetStateAction<keyof typeof templates>>;
};

const ChooseTemplate = ({ template, setTemplate }: Props) => {
  const [open, setOpen] = useState(false);

  const TemplatComponent = templates[template].template;

  return (
    <div className="flex justify-between items-center gap-6 max-sm:flex-col max-sm:justify-center the-shadow p-4 rounded-md mb-4">
      <div className="h-[150px] rounded-sm overflow-hidden border-2 border-slate-400 max-w-full w-[150px]">
        <TemplatComponent dummy={true} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <Button asChild>
          <DialogTrigger>Change Template</DialogTrigger>
        </Button>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="title">Choose a template</DialogTitle>

            <DialogDescription className="!mt-4 space-y-4">
              {Object.entries(templates).map(([key, data], i) => {
                const { template: Template } = data;
                return (
                  <CreateButton
                    key={i}
                    className="transition hover:the-shadow hover:scale-[1.02] w-full rounded-sm overflow-hidden border-2 border-slate-400 max-w-[1000px] mx-auto block"
                    onClick={() => {
                      setTemplate(key as any);
                      setOpen(false);
                    }}
                    ButtonTag={"button"}
                  >
                    <Template dummy={false} turnDummyInSmallScreens />
                  </CreateButton>
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
