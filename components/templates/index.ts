// templates
import TemplateOne from "./TemplateOne/TemplateOne";
import TemplateTwo from "./TemplateTwo/TemplateTwo";
import TemplateThree from "./TemplateThree/TemplateThree";

const templates = {
  "1": {
    template: TemplateOne,
    image: true,
  },
  "2": {
    template: TemplateTwo,
    image: false,
  },
  "3": {
    template: TemplateThree,
    image: false,
  },
};

export default templates;
