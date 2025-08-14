// react pdf
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image as PDFImage,
  Link,
  type Styles,
} from "@react-pdf/renderer";

// types
import type { DownloadTemplateProps } from "@/lib/types";

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

const globalTitleStyles = {
  fontWeight: "bold",
  textAlign: "center",
  fontSize: 22,
} as unknown as Styles;

const styles = StyleSheet.create({
  page: {
    color: "#64748b",
    fontFamily: "Open Sans",
    fontSize: 12,
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
  noLineTitle: globalTitleStyles,
  title: {
    borderBottom: "1px solid currentColor",
    marginBottom: 10,
    ...globalTitleStyles,
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
            backgroundColor: "#ffe4e6",
            padding: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Text style={styles.noLineTitle}>{name}</Text>
            <Text style={{ fontSize: 12 }}>{jobTitle}</Text>
          </View>

          <View style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <View style={styles.iconHolder}>
              <PDFImage style={styles.icon} src={`${domain}/email.png`} />
              <Text>{email}</Text>
            </View>
            <View style={styles.iconHolder}>
              <PDFImage style={styles.icon} src={`${domain}/phone.png`} />
              <Text>{phoneNumber}</Text>
            </View>
            <View style={styles.iconHolder}>
              <PDFImage style={styles.icon} src={`${domain}/location.png`} />
              <Text>{location}</Text>
            </View>

            {!!linkedinLink && (
              <Link style={{ color: "#64748b" }}>
                <View style={styles.iconHolder}>
                  <PDFImage
                    style={styles.icon}
                    src={`${domain}/linkedin.png`}
                  />
                  <Text>{linkedinLink}</Text>
                </View>
              </Link>
            )}

            {!!websiteLink && (
              <Link style={{ color: "#64748b" }}>
                <View style={styles.iconHolder}>
                  <PDFImage style={styles.icon} src={`${domain}/www.png`} />
                  <Text>{websiteLink}</Text>
                </View>
              </Link>
            )}

            {!!githubLink && (
              <Link style={{ color: "#64748b" }}>
                <View style={styles.iconHolder}>
                  <PDFImage style={styles.icon} src={`${domain}/github.png`} />
                  <Text>{githubLink}</Text>
                </View>
              </Link>
            )}
            {!!BehanceLink && (
              <Link style={{ color: "#64748b" }}>
                <View style={styles.iconHolder}>
                  <PDFImage style={styles.icon} src={`${domain}/behance.png`} />
                  <Text>{BehanceLink}</Text>
                </View>
              </Link>
            )}
          </View>
        </View>

        <View style={{ padding: 8, marginBottom: 10 }}>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text style={styles.noLineTitle}>About Me</Text>
            <Text style={{ textAlign: "center" }}>{about}</Text>
          </View>

          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                flexBasis: "50%",
                display: "flex",
                flexDirection: "column",
                gap: 15,
                paddingRight: projects.length ? 20 : 0,
              }}
            >
              <View>
                <Text style={styles.title}>Education</Text>
                <Text>{education}</Text>
              </View>

              {!!jobs.length && (
                <View>
                  <Text style={styles.title}>Experience</Text>
                  {jobs.map(({ job }, i) => (
                    <Text key={i}>- {job}</Text>
                  ))}
                </View>
              )}

              {!!skills.length && (
                <View>
                  <Text style={styles.title}>Skills</Text>

                  {skills.map(({ skill }, i) => (
                    <Text key={i}>- {skill}</Text>
                  ))}
                </View>
              )}
            </View>

            {!!projects.length && (
              <View
                style={{
                  flexBasis: "50%",
                  borderLeft: "1px solid #64748b",
                  paddingLeft: 20,
                }}
              >
                <Text style={styles.title}>Projects</Text>

                {projects.map(({ name, description }, i) => (
                  <View key={i}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "black",
                      }}
                    >
                      - {name}
                    </Text>
                    <Text>{description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

const DownloadTemplateThree = ({
  renderPDFViewer,
  ...props
}: DownloadTemplateProps) => (
  <DownloadTemplateHolder
    renderPDFViewer={renderPDFViewer}
    Template={<Template {...props} />}
  />
);

export default DownloadTemplateThree;
