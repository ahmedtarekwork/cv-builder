import { useState } from "react";

export default function useHandleSubmitCVForm() {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    handler: jest.fn(() => {
      setIsLoading(true);
      new Promise((r) =>
        setTimeout(() => {
          setIsLoading(false);

          r("");
        }, 50)
      );
    }),
  };
}
