// types
import type { DownloadTemplateProps } from "@/lib/types";

// pdf
import {
  Link,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image as PDFImage,
} from "@react-pdf/renderer";

// components
import DownloadTemplateHolder from "../../DownloadTemplateHolder";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 5,
    fontFamily: "Open Sans",
    color: "#64748b",
    fontSize: 14,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    borderBottom: "2px solid currentColor",
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
  },
  iconHolder: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  icon: {
    maxWidth: 20,
    aspectRatio: 1,
  },
});

const Template = ({
  about,
  education,
  email,
  jobTitle,
  jobs,
  linkedinLink,
  location,
  name,
  phoneNumber,
  projects,
  skills,
  websiteLink,
  BehanceLink,
  githubLink,
  domain,
}: Omit<DownloadTemplateProps, "renderPDFViewer">) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
            }}
          >
            {name}
          </Text>
          <Text style={{ fontSize: 14 }}>{jobTitle}</Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <View style={styles.iconHolder}>
            <PDFImage src={`${domain}/phone.png`} style={styles.icon} />
            <Text>{phoneNumber}</Text>
          </View>
          <View style={styles.iconHolder}>
            <PDFImage src={`${domain}/email.png`} style={styles.icon} />
            <Text>{email}</Text>
          </View>
          <View style={styles.iconHolder}>
            <PDFImage src={`${domain}/location.png`} style={styles.icon} />
            <Text>{location}</Text>
          </View>
          {!!websiteLink && (
            <Link style={{ color: "#64748b" }} href={websiteLink}>
              <View style={styles.iconHolder}>
                <PDFImage src={`${domain}/www.png`} style={styles.icon} />

                <Text>{websiteLink}</Text>
              </View>
            </Link>
          )}

          {!!linkedinLink && (
            <Link style={{ color: "#64748b" }} href={linkedinLink}>
              <View style={styles.iconHolder}>
                <PDFImage src={`${domain}/linkedin.png`} style={styles.icon} />
                <Text>{linkedinLink}</Text>
              </View>
            </Link>
          )}

          {!!githubLink && (
            <Link style={{ color: "#64748b" }} href={githubLink}>
              <View style={styles.iconHolder}>
                <PDFImage src={`${domain}/github.png`} style={styles.icon} />

                <Text>{githubLink}</Text>
              </View>
            </Link>
          )}

          {!!BehanceLink && (
            <Link style={{ color: "#64748b" }} href={BehanceLink}>
              <View>
                <PDFImage src={`${domain}/behance.png`} style={styles.icon} />
                <Text>{BehanceLink}</Text>
              </View>
            </Link>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>About Me</Text>
          <Text>{about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>
          <Text>{education}</Text>
        </View>

        {!!jobs.length && (
          <View style={styles.section}>
            <Text style={styles.title}>Experience</Text>

            {jobs.map(({ job }, i) => (
              <Text key={i}>-{job}</Text>
            ))}
          </View>
        )}

        {!!skills.length && (
          <View style={styles.section}>
            <Text style={styles.title}>Skills</Text>

            {skills.map(({ skill }, i) => (
              <Text key={i}>-{skill}</Text>
            ))}
          </View>
        )}

        {!!projects.length && (
          <View style={styles.section}>
            <Text style={styles.title}>Projects</Text>

            {projects.map(({ name, description }, i) => (
              <View key={i}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  - {name}
                </Text>
                <Text>{description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

const DownloadTemplateTwo = ({
  renderPDFViewer,
  ...props
}: DownloadTemplateProps) => (
  <DownloadTemplateHolder
    renderPDFViewer={renderPDFViewer}
    Template={<Template {...props} />}
  />
);

export default DownloadTemplateTwo;
