// icons
import { TbTrashXFilled } from "react-icons/tb";

// components
// shadcn
import { Button } from "@/components/ui/button";

type DeleteImgBtnProps = {
  handleRemoveImg: (type: "reset" | "delete") => void;
};

const DeleteImgBtn = ({ handleRemoveImg }: DeleteImgBtnProps) => {
  return (
    <Button
      title="delete image button"
      variant="destructive"
      onClick={() => handleRemoveImg("delete")}
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

export default DeleteImgBtn;
