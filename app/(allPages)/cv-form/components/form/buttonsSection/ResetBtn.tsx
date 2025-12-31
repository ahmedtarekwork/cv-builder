// react
import { useCallback } from "react";

// components
// shadcn
import { Button } from "@/components/ui/button";

// types
import type { BtnsSectionProps } from "./ButtontsSection";

const ResetBtn = ({
  addImageRef,
  initData,
  isEditMode,
  reset,
  setImage,
  initJob,
}: Pick<
  BtnsSectionProps,
  "isEditMode" | "addImageRef" | "reset" | "initData" | "setImage" | "initJob"
>) => {
  const handleReset = useCallback(() => {
    if (!isEditMode) return reset();
    if (!initData) return;

    const finalData = JSON.parse(JSON.stringify({ ...initData }));
    if (!finalData?.jobs?.length) finalData.jobs = [initJob];
    reset(finalData);

    setImage(undefined);
    addImageRef.current?.setShowImg(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button onClick={handleReset} type="button">
      Reset
    </Button>
  );
};
export default ResetBtn;
