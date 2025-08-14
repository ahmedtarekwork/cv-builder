import type { TheTemplateProps } from "@/components/templates/TemplateHolder";

export type DownloadTemplateProps = NonNullable<
  TheTemplateProps["templateData"] & {
    imgSrc?: string;
    domain: string;
    renderPDFViewer: boolean;
  }
>;
