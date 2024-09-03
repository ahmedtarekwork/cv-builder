// components
import TemplateHolder, { type TheTemplateProps } from "./TemplateHolder";

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
} from "@react-pdf/renderer";

// types
import type { TemplateDataType } from "@/app/new-cv/page";

// icons
import {
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaBehanceSquare,
} from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { Styles } from "@react-pdf/renderer";

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
}: NonNullable<TheTemplateProps["templateData"]>) => {
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
  } as Styles;

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
              <PDFImage style={styles.icon} src="./public/email.png" />
              <Text>{email}</Text>
            </View>
            <View style={styles.iconHolder}>
              <PDFImage style={styles.icon} src="./public/phone.png" />
              <Text>{phoneNumber}</Text>
            </View>
            <View style={styles.iconHolder}>
              <PDFImage style={styles.icon} src="./public/location.png" />
              <Text>{location}</Text>
            </View>

            <Link style={{ color: "#64748b" }}>
              <View style={styles.iconHolder}>
                <PDFImage style={styles.icon} src="./public/linkedin.png" />
                <Text>{linkedinLink}</Text>
              </View>
            </Link>

            {!!websiteLink && (
              <Link style={{ color: "#64748b" }}>
                <View style={styles.iconHolder}>
                  <PDFImage style={styles.icon} src="./public/www.png" />
                  <Text>{websiteLink}</Text>
                </View>
              </Link>
            )}

            {!!githubLink && (
              <Link style={{ color: "#64748b" }}>
                <View style={styles.iconHolder}>
                  <PDFImage style={styles.icon} src="./public/github.png" />
                  <Text>{githubLink}</Text>
                </View>
              </Link>
            )}
            {!!BehanceLink && (
              <Link style={{ color: "#64748b" }}>
                <View style={styles.iconHolder}>
                  <PDFImage style={styles.icon} src="./public/behance.png" />
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
}: TemplateDataType) => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-between gap-4 items-center p-2 bg-rose-100">
        <div>
          <h1 className="font-bold text-2xl">{name}</h1>
          <p className="text-[12px]">{jobTitle}</p>
        </div>

        <div className="text-left space-y-2 [&>*]:flex [&>*]:gap-2 [&>*]:items-center">
          <p>
            <MdEmail color="black" size={20} />
            {email}
          </p>
          <p>
            <FaPhoneAlt color="black" size={20} />
            {phoneNumber}
          </p>
          <p>
            <IoLocationSharp color="black" size={20} />
            {location}
          </p>
          <p>
            <FaLinkedin color="black" size={20} />
            {linkedinLink}
          </p>
          {websiteLink && (
            <p>
              <TbWorld color="black" size={20} />
              {websiteLink}
            </p>
          )}
          {githubLink && (
            <p>
              <FaGithub color="black" size={20} />
              {githubLink}
            </p>
          )}
          {BehanceLink && (
            <p>
              <FaBehanceSquare color="black" size={20} />
              {BehanceLink}
            </p>
          )}
        </div>
      </div>

      <div className="p-2">
        <div>
          <h2 className="font-bold text-2xl">About Me</h2>
          <p>{about}</p>
        </div>

        <div className="flex gap-6 py-3">
          <div
            className={
              projects.length ? "border-r-2 border-slate-600 pr-4" : ""
            }
          >
            <div className="py-2">
              <h3 className="font-bold text-slate-600 text-2xl border-b w-fit mx-auto border-b-1 border-slate-800 my-2">
                Education
              </h3>
              <p>{education}</p>
            </div>

            {!!jobs.length && (
              <div className="py-2">
                <h3 className="font-bold text-slate-600 text-2xl border-b w-fit mx-auto border-b-1 border-slate-800">
                  Experience
                </h3>
                <ul className="text-left my-2 space-y-1">
                  {jobs.map(({ job }, i) => (
                    <li key={i}>- {job}</li>
                  ))}
                </ul>
              </div>
            )}

            {!!skills.length && (
              <div className="py-2">
                <h3 className="font-bold text-slate-600 text-2xl border-b w-fit mx-auto border-b-1 border-slate-800">
                  Skills
                </h3>
                <ul className="mt-2 space-y-2 text-left">
                  {skills.map(({ skill }, i) => (
                    <li key={i}>- {skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {!!projects.length && (
            <div>
              <div className="py-2">
                <h3 className="font-bold mb-2 text-slate-600 text-2xl border-b w-fit mx-auto border-b-1 border-slate-800">
                  Projects
                </h3>
                <ul className="space-y-4 text-left">
                  {projects.map(({ name, description }, i) => (
                    <li key={i}>
                      <h4 className="font-bold text-slate-800">- {name}</h4>
                      <p>{description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dummy = () => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-between w-full bg-rose-100 p-2 border-b-4 border-slate-600">
        <div className="basis-1/2 space-y-2">
          <div className="bg-slate-600 h-5 w-[80%]" />
          <div className="bg-slate-600 h-2 w-[60%]" />
        </div>

        <div className="basis-1/2 space-y-3">
          <div className="bg-slate-600 h-2 w-[60%] ml-auto" />
          <div className="bg-slate-600 h-2 w-[80%] ml-auto" />
          <div className="bg-slate-600 h-2 w-[93%] ml-auto" />
        </div>
      </div>

      <div className="p-2">
        <div className="space-y-3">
          <div className="h-5 w-1/2 bg-slate-600 mx-auto" />

          <div className="h-2 w-[90%] bg-slate-600" />
          <div className="h-2 w-[78%] bg-slate-600" />
          <div className="h-2 w-[65%] bg-slate-600" />
        </div>

        <div className="flex mt-4 gap-6">
          <div className="basis-1/2 border-r-2 border-slate-600 space-y-2 pr-6">
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
          </div>

          <div className="basis-1/2 space-y-2">
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
            <div className="space-y-2">
              <div className="h-5 w-1/2 bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
              <div className="h-2 w-full bg-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateThree = ({
  dummy = true,
  templateData,
  turnDummyInSmallScreens,
}: TheTemplateProps) => {
  return (
    <TemplateHolder
      dummy={{
        value: dummy,
        DummyComponent: <Dummy />,
      }}
      templateData={templateData}
      Template={TheTemplate}
      turnDummyInSmallScreens={turnDummyInSmallScreens}
    />
  );
};
export default TemplateThree;
