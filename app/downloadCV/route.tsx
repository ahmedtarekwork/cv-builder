// nextjs
import { type NextRequest, NextResponse } from "next/server";

// templates
import templates from "@/components/templates";

// firebase
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

// types
import type { TemplateDataType } from "../new-cv/page";

// utils
// render as pdf
import { renderToStream } from "@react-pdf/renderer";

const getCVData = async (id: string) => {
  "use server";

  const docRef = doc(db, "CVs/", id);

  return (await getDoc(docRef)).data() as TemplateDataType & {
    templateIndex: number;
  };
};

export async function GET({ nextUrl, url }: NextRequest) {
  const { CVID } = Object.fromEntries(nextUrl.searchParams.entries());

  const { templateIndex, ...data } = await getCVData(CVID);

  const finalTemplateIndex = Object.keys(templates).some(
    (key) => +key == templateIndex
  )
    ? templateIndex
    : "1";

  const SelectedTemplate =
    templates[finalTemplateIndex as keyof typeof templates].DownloadTemplate;

  const stream = await renderToStream(
    <SelectedTemplate {...data} domain={new URL(url).origin} />
  );

  return new NextResponse(stream as unknown as ReadableStream);
}
