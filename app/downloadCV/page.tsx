// nextjs
import { headers } from "next/headers";

// templates
import DownloadTemplateOne from "@/components/templates/TemplateOne/DownloadTemplateOne";
import DownloadTemplateTwo from "@/components/templates/TemplateTwo/DownloadTemplateTwo";
import DownloadTemplateThree from "@/components/templates/TemplateThree/DownloadTemplateThree";

// firebase
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

// types
import type { TemplateDataType } from "@/app/(allPages)/cv-form/page";

const getCVData = async (id: string) => {
  "use server";

  const docRef = doc(db, "CVs/", id);

  return (await getDoc(docRef)).data() as TemplateDataType & {
    templateIndex: number;
    createdAt: unknown;
  };
};

const templates = {
  1: DownloadTemplateOne,
  2: DownloadTemplateTwo,
  3: DownloadTemplateThree,
};

export default async function DownloadCVPage({
  searchParams,
}: {
  searchParams: Promise<{ CVID: string }>;
}) {
  const headersList = await headers();
  const host = headersList.get("host");

  const CVID = (await searchParams)?.CVID;

  const { templateIndex, createdAt: _, ...data } = await getCVData(CVID);

  const finalTemplateIndex = Object.keys(templates).includes(
    templateIndex.toString()
  )
    ? templateIndex
    : "1";

  const SelectedTemplate =
    templates[finalTemplateIndex as keyof typeof templates];

  return <SelectedTemplate renderPDFViewer {...data} domain={host || ""} />;
}
