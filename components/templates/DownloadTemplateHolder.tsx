"use client";

import { PDFViewer } from "@react-pdf/renderer";

type Props = {
  Template: JSX.Element;
  renderPDFViewer: boolean;
};

const DownloadTemplateHolder = ({ Template, renderPDFViewer }: Props) => {
  if (renderPDFViewer) {
    return <PDFViewer className="min-h-screen">{Template}</PDFViewer>;
  }

  return Template;
};
export default DownloadTemplateHolder;
