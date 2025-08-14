"use client";
import dynamic from "next/dynamic";

export default dynamic(
  () => import("./DownloadTemplateOne").then((m) => m.default),
  {
    ssr: false,
  }
);
