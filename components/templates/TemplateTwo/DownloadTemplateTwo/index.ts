"use client";
import dynamic from "next/dynamic";

export default dynamic(
  () => import("./DownloadTemplateTwo").then((m) => m.default),
  {
    ssr: false,
  }
);
