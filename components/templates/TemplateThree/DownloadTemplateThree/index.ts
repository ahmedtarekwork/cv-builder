"use client";
import dynamic from "next/dynamic";

export default dynamic(
  () => import("./DownloadTemplateThree").then((m) => m.default),
  {
    ssr: false,
  }
);
