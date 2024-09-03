// nextjs
import Image from "next/image";

// components
import TemplateHolder, { type TheTemplateProps } from "./TemplateHolder";

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

// types
import type { TemplateDataType } from "@/app/new-cv/page";

export const DownloadTemplate = ({
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
}: NonNullable<TheTemplateProps["templateData"] & { imgSrc?: string }>) => {
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

const TheTemplate = ({
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
}: NonNullable<TheTemplateProps["templateData"] & { imgSrc?: string }>) => {
  return (
    <div className="h-full flex flex-1">
      <div className="bg-blue-800 break-words space-y-3 max-w-[250px] flex-[0.4] text-white p-2">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="image"
            width={110}
            height={110}
            className="mx-auto"
          />
        )}

        <div className="text-left space-y-3">
          <h2 className="font-bold border-b-2 text-xl border-white">Info</h2>
          <p>name: {name}</p>
          <p>email: {email}</p>
          <p>location: {location}</p>
          <p>jop title: {jobTitle}</p>
          <p>phone number: {phoneNumber}</p>
          {websiteLink && <p>website link: {websiteLink}</p>}
          {githubLink && <p>github link: {githubLink}</p>}
          {linkedinLink && <p>linkedin link: {linkedinLink}</p>}
          {BehanceLink && <p>Behance link: {BehanceLink}</p>}
        </div>

        {!!skills.length && (
          <div className="text-left space-y-3">
            <h2 className="font-bold border-b-2 text-xl border-white">
              Skills
            </h2>
            <ul className="text-left space-y-3">
              {skills.map(({ skill }, i) => (
                <li key={i}>- {skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex-1 text-left">
        <div className="p-2 space-y-4 flex-1">
          <h2 className="font-bold border-b-2 text-2xl border-slate-600">
            About Me
          </h2>
          <p className="text-left">{about}</p>
        </div>

        <div className="p-2 space-y-4 flex-1">
          <h2 className="font-bold border-b-2 text-2xl border-slate-600">
            Education
          </h2>
          <p className="text-left">{education}</p>
        </div>

        {!!projects.length && (
          <div className="p-2 space-y-4 flex-1">
            <h2 className="font-bold border-b-2 text-2xl border-slate-600">
              Projects
            </h2>
            <ul className="text-left space-y-2">
              {projects.map(({ name, description }, i) => (
                <li key={i}>
                  <h3 className="font-bold">{name}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!!jobs.length && (
          <div className="p-2 space-y-4 flex-1">
            <h2 className="font-bold border-b-2 text-2xl border-slate-600">
              Experience
            </h2>
            <ul className="text-left">
              {jobs.map(({ job }, i) => (
                <li key={i}>{job}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Dummy = () => {
  return (
    <div className="h-full flex">
      <div className="bg-blue-800 space-y-3 max-w-[250px] basis-1/4 text-white p-2">
        <div className="w-10 h-10 rounded-full bg-white mx-auto" />

        <div className="space-y-2">
          <div className="w-1/2 h-2 mx-auto bg-white" />
          <div className="w-full h-1 bg-white" />
          <div className="w-[80%] h-1 bg-white" />
          <div className="w-[60%] h-1 bg-white" />
        </div>
        <div className="space-y-2">
          <div className="w-1/2 h-2 mx-auto bg-white" />
          <div className="w-full h-1 bg-white" />
          <div className="w-[80%] h-1 bg-white" />
          <div className="w-[60%] h-1 bg-white" />
        </div>
        <div className="space-y-2">
          <div className="w-1/2 h-2 mx-auto bg-white" />
          <div className="w-full h-1 bg-white" />
          <div className="w-[80%] h-1 bg-white" />
          <div className="w-[60%] h-1 bg-white" />
        </div>
      </div>

      <div className="p-2 space-y-4 flex-1">
        <div className="space-y-2">
          <div className="w-1/4 h-3 mx-auto bg-slate-600" />
          <div className="w-full h-1 bg-slate-600" />
          <div className="w-[80%] h-1 bg-slate-600" />
          <div className="w-[60%] h-1 bg-slate-600" />
        </div>
        <div className="space-y-2">
          <div className="w-1/4 h-3 mx-auto bg-slate-600" />
          <div className="w-full h-1 bg-slate-600" />
          <div className="w-[80%] h-1 bg-slate-600" />
          <div className="w-[60%] h-1 bg-slate-600" />
        </div>
        <div className="space-y-2">
          <div className="w-1/4 h-3 mx-auto bg-slate-600" />
          <div className="w-full h-1 bg-slate-600" />
          <div className="w-[80%] h-1 bg-slate-600" />
          <div className="w-[60%] h-1 bg-slate-600" />
        </div>
      </div>
    </div>
  );
};

const TemplateOne = ({
  dummy = true,
  templateData,
  turnDummyInSmallScreens,
}: TheTemplateProps) => {
  return (
    <TemplateHolder
      Template={TheTemplate}
      dummy={{
        value: dummy,
        DummyComponent: <Dummy />,
      }}
      turnDummyInSmallScreens={turnDummyInSmallScreens}
      templateData={templateData as TemplateDataType}
    />
  );
};
export default TemplateOne;
