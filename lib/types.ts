import type { TheTemplateProps } from "@/components/templates/TemplateHolder";

export type DownloadTemplateProps = NonNullable<
  TheTemplateProps["templateData"] & {
    imgSrc?: string;
    domain: string;
    renderPDFViewer: boolean;
  }
>;

export type Job = { job: string };
export type Skill = { skill: string };
export type Project = Record<"name" | "description", string>;
