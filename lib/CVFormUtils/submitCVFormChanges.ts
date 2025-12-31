// nextjs
import { db } from "@/config/firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

// types
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Params = {
  finalData: Record<string, unknown>;
  isEditMode?: boolean;
  templateId?: string;
  router: AppRouterInstance;
};

const submitCVFormChanges = async ({
  finalData,
  isEditMode,
  templateId,
  router,
}: Params) => {
  const ref = isEditMode ? doc(db, "CVs", templateId!) : collection(db, "CVs");

  const method = () => (isEditMode ? updateDoc : addDoc);

  const res = await method()(ref as any, finalData as any);

  const id = isEditMode
    ? templateId
    : (res as Awaited<ReturnType<typeof addDoc>>).id;

  window.open(`/downloadCV?CVID=${id}`, "_blank");
  router.push("/profile");
};

export default submitCVFormChanges;
