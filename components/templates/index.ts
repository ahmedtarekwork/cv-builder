import TemplateOne, {
  DownloadTemplate as DownloadTemplateOne,
} from "./TemplateOne";

import TemplateTwo, {
  DownloadTemplate as DownloadTemplateTwo,
} from "./TemplateTwo";

import TemplateThree, {
  DownloadTemplate as DownloadTemplateThree,
} from "./TemplateThree";

const templates = {
  "1": {
    template: TemplateOne,
    image: true,
    DownloadTemplate: DownloadTemplateOne,
  },
  "2": {
    template: TemplateTwo,
    image: false,
    DownloadTemplate: DownloadTemplateTwo,
  },
  "3": {
    template: TemplateThree,
    image: false,
    DownloadTemplate: DownloadTemplateThree,
  },
};
export default templates;
