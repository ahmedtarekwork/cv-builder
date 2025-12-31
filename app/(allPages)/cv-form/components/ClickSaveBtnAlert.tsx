// components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// icons
import { RiErrorWarningFill } from "react-icons/ri";

type Props = {
  isEditMode: boolean;
};

const ClickSaveBtnAlert = ({ isEditMode }: Props) => {
  if (!isEditMode) return;

  return (
    <Alert className="mb-5 the-shadow">
      <RiErrorWarningFill title="exclamation-icon" className="h-5 w-5" />
      <AlertTitle>Remember</AlertTitle>
      <AlertDescription title="alert description">
        {"Don't"} forget to click Save button after you finish your edits
      </AlertDescription>
    </Alert>
  );
};
export default ClickSaveBtnAlert;
