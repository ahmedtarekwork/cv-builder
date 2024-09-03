import type { TemplateDataType } from "@/app/new-cv/page";
import TemplateHolder, { type TheTemplateProps } from "./TemplateHolder";
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
  domain,
}: NonNullable<TheTemplateProps["templateData"]> & { domain: string }) => {
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

          <Link style={{ color: "#64748b" }} href={linkedinLink}>
            <View style={styles.iconHolder}>
              <PDFImage src={`${domain}/linkedin.png`} style={styles.icon} />
              <Text>{linkedinLink}</Text>
            </View>
          </Link>

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

const TheTemplate = ({
  email,
  jobTitle,
  linkedinLink,
  location,
  name,
  phoneNumber,
  about,
  education,
  jobs,
  projects,
  skills,
  websiteLink,
  BehanceLink,
  githubLink,
}: TemplateDataType) => {
  return (
    <div className="h-full p-2">
      <h1 className="font-bold text-2xl">{name}</h1>
      <p className="text-[12px]">{jobTitle}</p>

      <div className="flex items-center justify-between my-4 flex-wrap gap-2 [&>*]:flex [&>*]:gap-2 [&>*]:items-center">
        <p>
          <FaPhoneAlt size={20} color="black" />
          {phoneNumber}
        </p>
        <p>
          <MdEmail size={20} color="black" />
          {email}
        </p>
        <p>
          <IoLocationSharp size={20} color="black" />
          {location}
        </p>
        {websiteLink && (
          <p>
            <TbWorld size={20} color="black" />
            {websiteLink}
          </p>
        )}
        <p>
          <FaLinkedin size={20} color="black" />
          {linkedinLink}
        </p>
        {githubLink && (
          <p>
            <FaGithub size={20} color="black" />
            {githubLink}
          </p>
        )}
        {BehanceLink && (
          <p>
            <FaBehanceSquare size={20} color="black" />
            {BehanceLink}
          </p>
        )}
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto">
          About Me
        </h2>
        <p className="text-left my-4">{about}</p>
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto mb-1">
          Education
        </h2>
        <p className="text-left my-4">{education}</p>
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto">
          Experience
        </h2>
        <ul className="my-4 text-left">
          {jobs.map(({ job }, i) => (
            <li key={i}>{job}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto">
          Skills
        </h2>
        <ul className="mt-2 text-left">
          {skills.map(({ skill }, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="border-b-[3px] border-slate-600 font-bold text-2xl text-slate-600 mx-auto">
          Projects
        </h2>
        <ul className="mt-2 text-left space-y-4">
          {projects.map(({ name, description }, i) => (
            <li key={i}>
              <h3 className="font-bold text-slate-900">{name}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Dummy = () => {
  return (
    <div className="h-full p-2 w-full">
      <div className="h-3 w-1/2 bg-slate-600 mx-auto" />
      <div className="h-1 w-4 bg-slate-600 mx-auto mt-1" />
      <div className="flex justify-between items-center">
        <div className="h-1 w-10 bg-slate-600" />
        <div className="h-1 w-10 bg-slate-600" />
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-3 w-14 bg-slate-600 mx-auto" />
        <div className="h-1 w-full bg-slate-600" />
        <div className="h-1 w-[90%] bg-slate-600" />
        <div className="h-1 w-[75%] bg-slate-600" />
        <div className="h-1 w-[60%] bg-slate-600" />
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-3 w-14 bg-slate-600 mx-auto" />
        <div className="h-1 w-full bg-slate-600" />
        <div className="h-1 w-[90%] bg-slate-600" />
        <div className="h-1 w-[75%] bg-slate-600" />
        <div className="h-1 w-[60%] bg-slate-600" />
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-3 w-14 bg-slate-600 mx-auto" />
        <div className="h-1 w-full bg-slate-600" />
        <div className="h-1 w-[90%] bg-slate-600" />
        <div className="h-1 w-[75%] bg-slate-600" />
        <div className="h-1 w-[60%] bg-slate-600" />
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-3 w-14 bg-slate-600 mx-auto" />
        <div className="h-1 w-full bg-slate-600" />
        <div className="h-1 w-[90%] bg-slate-600" />
        <div className="h-1 w-[75%] bg-slate-600" />
        <div className="h-1 w-[60%] bg-slate-600" />
      </div>
    </div>
  );
};

const TemplateTwo = ({
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
export default TemplateTwo;
