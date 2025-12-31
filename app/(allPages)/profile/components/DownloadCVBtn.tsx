// components
import Spinner from "@/components/Spinner";

// shadcn
import { Button } from "@/components/ui/button";

// pdf
import { PDFDownloadLink } from "@react-pdf/renderer";

// icons
import { FaDownload } from "react-icons/fa6";

// types
import type { TemplateDataType } from "../../cv-form/page";

// templates
import DownloadTemplateOne from "@/components/templates/TemplateOne/DownloadTemplateOne/DownloadTemplateOne";
import DownloadTemplateTwo from "@/components/templates/TemplateTwo/DownloadTemplateTwo/DownloadTemplateTwo";
import DownloadTemplateThree from "@/components/templates/TemplateThree/DownloadTemplateThree/DownloadTemplateThree";

const DownloadTemplates = {
  1: DownloadTemplateOne,
  2: DownloadTemplateTwo,
  3: DownloadTemplateThree,
};

const DownloadCVBtn = ({
  data,
  templateIndex,
}: {
  data: TemplateDataType;
  templateIndex: number;
}) => {
  const DownloadTemplate =
    DownloadTemplates[
      (templateIndex.toString() ||
        "1") as unknown as keyof typeof DownloadTemplates
    ];

  return (
    <Button asChild>
      <PDFDownloadLink
        document={
          <DownloadTemplate
            renderPDFViewer={false}
            {...data}
            domain={window.location.origin}
          />
        }
        fileName="CV.pdf"
      >
        {({ loading }) => {
          return loading ? <Spinner /> : <FaDownload size={24} />;
        }}
      </PDFDownloadLink>
    </Button>
  );
};
export default DownloadCVBtn;
