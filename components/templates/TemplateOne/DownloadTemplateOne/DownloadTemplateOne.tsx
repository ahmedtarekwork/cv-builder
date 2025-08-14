"use client";

// pdf
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image as PDFImage,
  Link,
  Font,
  Tspan,
} from "@react-pdf/renderer";

// tpyes
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

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  sectionLeft: {
    fontFamily: "Open Sans",
    fontSize: 12,
    padding: 4,
    paddingRight: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backgroundColor: "#1e40af",
    flexBasis: "30%",
    color: "#fff",
  },
  sectionRight: {
    flex: 1,
    padding: 4,
    color: "#475569",
    fontFamily: "Open Sans",
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    borderBottom: "2px solid #fff",
    marginBottom: 7,
    fontSize: 20,
  },
  blackTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#475569",
    borderBottom: "2px solid #475569",
    marginBottom: 7,
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
  imgSrc,
}: Omit<DownloadTemplateProps, "domain" | "renderPDFViewer">) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sectionLeft}>
          {imgSrc && <PDFImage src={imgSrc} />}

          <View>
            <Text style={styles.title}>Info</Text>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Text>name: {name}</Text>
              <Text>email: {email}</Text>
              <Text>location: {location}</Text>
              <Text>job title: {jobTitle}</Text>
              <Text>phone number: {phoneNumber}</Text>

              {!!websiteLink && (
                <View>
                  <Text>website link: </Text>
                  <Text>
                    <Link style={{ color: "#fff" }} href={websiteLink}>
                      {websiteLink.split("").map((l, i) => (
                        <Tspan key={i}>{l}</Tspan>
                      ))}
                    </Link>
                  </Text>
                </View>
              )}

              {!!githubLink && (
                <View>
                  <Text>github link: </Text>

                  <Text>
                    <Link style={{ color: "#fff" }} href={githubLink}>
                      {githubLink.split("").map((l, i) => (
                        <Tspan key={i}>{l}</Tspan>
                      ))}
                    </Link>
                  </Text>
                </View>
              )}
              {!!BehanceLink && (
                <View>
                  <Text>behance link: </Text>
                  <Text>
                    <Link style={{ color: "#fff" }} href={BehanceLink}>
                      {BehanceLink.split("").map((l, i) => (
                        <Tspan key={i}>{l}</Tspan>
                      ))}
                    </Link>
                  </Text>
                </View>
              )}

              {!!linkedinLink && (
                <View>
                  <Text>linkedin link:</Text>
                  <Text>
                    <Link style={{ color: "#fff" }} href={linkedinLink}>
                      {linkedinLink.split("").map((l, i) => (
                        <Tspan key={i}>{l}</Tspan>
                      ))}
                    </Link>
                  </Text>
                </View>
              )}
            </View>
          </View>

          {!!skills.length && (
            <View>
              <Text style={styles.title}>Skills</Text>

              {skills.map(({ skill }, i) => (
                <Text key={i} style={{ marginTop: i === 0 ? undefined : 5 }}>
                  - {skill}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.sectionRight}>
          <View style={{ fontSize: 12, marginBottom: 15 }}>
            <Text style={styles.blackTitle}>About Me</Text>

            <Text>{about}</Text>
          </View>

          <View style={{ fontSize: 12, marginBottom: 15 }}>
            <Text style={styles.blackTitle}>Education</Text>

            <Text>{education}</Text>
          </View>

          {!!projects.length && (
            <View style={{ fontSize: 12, marginBottom: 15 }}>
              <Text style={styles.blackTitle}>Projects</Text>

              {projects.map(({ description, name }, i) => (
                <View key={i} style={{ marginTop: i === 0 ? undefined : 5 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    - {name}
                  </Text>
                  <Text>{description}</Text>
                </View>
              ))}
            </View>
          )}

          {!!jobs.length && (
            <View style={{ fontSize: 14, marginBottom: 15 }}>
              <Text style={styles.blackTitle}>Experience</Text>

              {jobs.map(({ job }, i) => (
                <Text key={i} style={{ marginTop: i === 0 ? undefined : 5 }}>
                  - {job}
                </Text>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

const DownloadTemplateOne = ({
  renderPDFViewer,
  ...props
}: Omit<DownloadTemplateProps, "domain">) => (
  <DownloadTemplateHolder
    renderPDFViewer={renderPDFViewer}
    Template={<Template {...props} />}
  />
);
export default DownloadTemplateOne;
