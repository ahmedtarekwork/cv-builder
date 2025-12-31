// nextjs
import { useRouter } from "next/navigation";

// firebase
import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// types
import type {
  InputsTypes,
  TemplateDataType,
} from "@/app/(allPages)/cv-form/page";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";

type Params = {
  setInitLoading: Dispatch<SetStateAction<boolean>>;
  templateId: string | null;
  setInitImage: Dispatch<
    SetStateAction<Record<"id" | "img", string> | undefined>
  >;
  setInitData: Dispatch<SetStateAction<TemplateDataType | undefined>>;
  setActiveTemplate: Dispatch<SetStateAction<"1" | "2" | "3">>;
  initTemplate: MutableRefObject<"1" | "2" | "3">;
};

const useGetFormInitData = ({
  setInitLoading,
  templateId,
  setInitData,
  setInitImage,
  setActiveTemplate,
  initTemplate,
}: Params) => {
  const router = useRouter();

  return async () => {
    const docRef = doc(db, "CVs", templateId!);
    const data = (await getDoc(docRef)).data();

    setInitLoading(false);

    if (data) {
      const inputsValues = Object.fromEntries(
        Object.entries(JSON.parse(JSON.stringify(data))).filter(
          ([key]) =>
            !["userId", "templateIndex", "imgSrc", "imgId"].includes(key)
        )
      ) as InputsTypes;

      setInitData(inputsValues);
      setActiveTemplate(data.templateIndex.toString());
      initTemplate.current = data.templateIndex.toString();

      if (data.imgSrc && data.imgId) {
        setInitImage({
          img: data.imgSrc,
          id: data.imgId,
        });
      }
    } else router.push("/profile");
  };
};

export default useGetFormInitData;
