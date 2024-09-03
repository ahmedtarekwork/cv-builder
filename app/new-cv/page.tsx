"use client";

// nextjs
import { useRouter, useSearchParams } from "next/navigation";
// react
import { useEffect, useRef, useState } from "react";

// templates
import templates from "@/components/templates";

// components
import InputsSection from "@/components/InputsSection";
import AddImage, { type AddImageRefType } from "@/components/AddImage";
import ChooseTemplate from "@/components/ChooseTemplate";

// shadcn
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// icons
import { FaSave, FaEye } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";

// react hook form
import {
  useForm,

  // types
  type SubmitErrorHandler,
  type SubmitHandler,
  type Path,
} from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// utils
import { toast } from "sonner";
import { nanoid } from "nanoid";

// firebase
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/config/firebaseConfig";

const initSkill = { skill: "" };
const initJob = { job: "" };
const initProject = { name: "", description: "" };

export type TemplateDataType = Record<
  | "name"
  | "jobTitle"
  | "phoneNumber"
  | "location"
  | "linkedinLink"
  | "about"
  | "education"
  | "email",
  string
> &
  Partial<Record<"githubLink" | "BehanceLink" | "websiteLink", string>> & {
    skills: { skill: string }[];
    jobs: { job: string }[];
    projects: Record<"name" | "description", string>[];
  };

type InputsTypes = TemplateDataType & { projectName: string };

const NewCVPage = () => {
  const router = useRouter();
  const templateId = useSearchParams().get("id");

  // refs
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const addImageRef = useRef<AddImageRefType>(null);
  const editMode = useRef(!!templateId);
  const initTemplate = useRef<keyof typeof templates>("1");

  // states
  const [template, setTemplate] = useState<keyof typeof templates>("1");
  const [isLoading, setIsLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(!!editMode.current);
  const [image, setImage] = useState<File | null>(null);

  const [initData, setInitData] = useState<TemplateDataType | null>(null);
  const [initImage, setInitImage] = useState<
    Record<"img" | "id", string> | undefined
  >(undefined);

  // RHF
  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InputsTypes>({
    defaultValues: {
      projectName: "untitled",
      skills: [initSkill],
      jobs: [initJob],
      projects: [initProject],
    },
  });

  const {
    projectName: projectNameErr,
    about: aboutErr,
    education: educationErr,
    email: emailErr,
    jobTitle: jobTitleErr,
    linkedinLink: linkedinLinkErr,
    location: locationErr,
    name: nameErr,
    phoneNumber: phoneNumberErr,
    websiteLink: websiteLinkErr,
    BehanceLink: BehanceLinkErr,
    githubLink: githubLinkErr,
  } = errors;

  const PreviewTemplate = templates[template].template;

  const arrayFieldsErrors = (
    skills: TemplateDataType["skills"],
    projects: TemplateDataType["projects"],
    invokeSubmit = false
  ) => {
    const projectsReason = projects
      .map((project) => Object.values(project))
      .flat(Infinity)
      .some((val) => !val);

    const skillsReason = skills
      .map(({ skill }) => skill)
      .some((skill) => !skill);

    const singleProjectsReason =
      projects.length === 1 && Object.values(projects[0]).every((val) => !val);

    const singleSkillsReason = skills.length === 1 && !skills[0].skill;

    const reasons = [
      {
        reason: singleProjectsReason || projectsReason,
        name: "projects",
        message: singleProjectsReason
          ? "you must have at least one project"
          : "you must fill all properties for each project, or remove unneccessery ones",
      },
      {
        reason: singleSkillsReason || skillsReason,
        name: "skills",
        message: singleSkillsReason
          ? "you must have at least one skill"
          : "you must fill in all skills you have added, or remove empty ones",
      },
    ].map(({ reason, name, message }) => {
      if (reason) setError(name as keyof TemplateDataType, { message });
      else clearErrors(name as keyof TemplateDataType);

      return reason;
    });

    if (reasons.every((reason) => !reason) && invokeSubmit) {
      handleSubmit(onSubmit)();
    }

    return { skillsReason, projectsReason };
  };

  const onSubmit: SubmitHandler<InputsTypes> = async (data, e) => {
    e?.preventDefault();

    const { projectsReason, skillsReason } = arrayFieldsErrors(
      data.skills,
      data.projects
    );

    if (skillsReason || projectsReason) return;

    data.jobs = data.jobs.filter(({ job }) => job);

    const imgSrc = async () => {
      if (templates[template].image && image) {
        try {
          const imgId = initImage?.id || nanoid();
          const { ref: getImgLink } = await uploadBytes(
            ref(storage, imgId),
            image
          );
          return { imgSrc: await getDownloadURL(getImgLink), imgId };
        } catch (e) {
          toast.error("something went wrong while upload your image");
          setIsLoading(false);
          return;
        }
      }

      // remove img
      if (editMode.current) {
        if (!image && !addImageRef.current?.showImg && initImage?.id) {
          try {
            await deleteObject(ref(storage, initImage.id));
            return { imgSrc: deleteField(), imgId: deleteField() };
          } catch (e) {
            toast.error("something went wrong while deleting your image");
            setIsLoading(false);
          }
        }
      }
    };

    setIsLoading(true);
    try {
      let finalData: Record<string, unknown> = {};

      if (editMode.current) {
        finalData = Object.fromEntries(
          Object.entries(data).filter(([key, value]) => {
            const oldValue = initData?.[key as keyof typeof initData];
            if (!oldValue) return;

            if (Array.isArray(value)) {
              if (!Array.isArray(oldValue)) return;
              if (oldValue.length !== value.length) return true;

              switch (key) {
                case "skills": {
                  return !oldValue.every(
                    (old, i) =>
                      (value[i] as typeof initSkill)?.skill ===
                      (old as typeof initSkill)?.skill
                  );
                }

                case "jobs": {
                  return !oldValue.every(
                    (old, i) =>
                      (value[i] as typeof initJob)?.job ===
                      (old as typeof initJob)?.job
                  );
                }

                case "projects": {
                  return !oldValue.every((old, i) => {
                    const oldProject = old as typeof initProject;
                    const currentProject = value[i] as typeof initProject;

                    return (
                      oldProject?.name === currentProject?.name ||
                      oldProject?.description === currentProject?.description
                    );
                  });
                }
              }
            } else return oldValue !== value;
          })
        );

        if (template != initTemplate.current)
          finalData.templateIndex = template;

        if (!Object.keys(finalData).length) {
          toast.error("make some changes on your info before save it");
          return;
        }
      } else {
        finalData = {
          ...data,
          templateIndex: +template,
          userId: auth.currentUser?.uid,
        };
      }

      finalData.createdAt = serverTimestamp();

      const imgData = await imgSrc(); // upload image
      if (imgData?.imgSrc && imgData?.imgId)
        finalData = { ...finalData, ...imgData };

      const ref = editMode.current
        ? doc(db, "CVs", templateId!)
        : collection(db, "CVs");

      const method = () => (editMode.current ? updateDoc : addDoc);

      const res = await method()(ref as any, finalData as any);

      const id = editMode.current
        ? templateId
        : (res as Awaited<ReturnType<typeof addDoc>>).id;

      window.open(`/downloadCV?CVID=${id}`, "_blank");
      router.push("/profile");
    } catch (error) {
      toast.error("something went wrong while downloading your CV");
    } finally {
      setIsLoading(false);
    }
  };

  const onInvalid: SubmitErrorHandler<InputsTypes> = () => {
    const skills = getValues("skills");
    const projects = getValues("projects");

    arrayFieldsErrors(skills, projects, true);
  };

  useEffect(() => {
    if (editMode.current) {
      (async () => {
        const docRef = doc(db, "CVs", templateId!);
        const data = (await getDoc(docRef)).data();
        setInitLoading(false);

        if (data) {
          const inputsValues = Object.fromEntries(
            Object.entries(JSON.parse(JSON.stringify(data))).filter(
              ([key]) =>
                !["userId", "templateIndex", "imgSrc", "imgId"].includes(key)
            )
          ) as InputsTypes;

          setInitData(inputsValues);
          setTemplate(data.templateIndex.toString());
          initTemplate.current = data.templateIndex.toString();

          if (data.imgSrc && data.imgId) {
            setInitImage({
              img: data.imgSrc,
              id: data.imgId,
            });
          }

          Object.entries(inputsValues).forEach(([key, value]) => {
            if (key === "jobs" && !value.length) return;

            setValue(key as keyof InputsTypes, value);
          });
        } else router.push("/profile");
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initLoading) {
    return (
      <h1
        className="text-primary font-bold h-full grid place-content-center flex-1"
        style={{ fontSize: 36 }}
      >
        Loading...
      </h1>
    );
  }

  return (
    <main className="container">
      {editMode.current && (
        <Alert className="mb-5 the-shadow">
          <RiErrorWarningFill className="h-5 w-5" />
          <AlertTitle>Remember</AlertTitle>
          <AlertDescription>
            {"Don't"} forget to click Save button after you finish your edits
          </AlertDescription>
        </Alert>
      )}

      <ChooseTemplate template={template} setTemplate={setTemplate} />

      <form
        className="pt-4 space-y-2"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        noValidate
      >
        <h2 className="title mb-4">ProjectName</h2>
        <Input
          placeholder="Project Name"
          {...register("projectName", {
            required: "You must provide a name for this project",
          })}
        />
        {projectNameErr?.message && (
          <p className="text-destructive">{projectNameErr?.message}</p>
        )}

        <h2 className="title mb-4">Your Info</h2>
        <div className="inputs-holder">
          <div>
            <Input
              placeholder="name"
              {...register("name", {
                required: "name is required",
              })}
            />
            {nameErr?.message && (
              <p className="block text-destructive">{nameErr.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="job title"
              {...register("jobTitle", {
                required: "job title is required",
              })}
            />
            {jobTitleErr?.message && (
              <p className="text-destructive">{jobTitleErr.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="phone number"
              type="number"
              {...register("phoneNumber", {
                required: "phone number is required",
                valueAsNumber: true,
              })}
            />
            {phoneNumberErr?.message && (
              <p className="text-destructive">{phoneNumberErr.message}</p>
            )}
          </div>
        </div>

        <div className="inputs-holder">
          <div>
            <Input
              placeholder="location"
              {...register("location", {
                required: "location is required",
              })}
            />
            {locationErr?.message && (
              <p className="text-destructive">{locationErr.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="your website link"
              {...register("websiteLink", {
                validate: (val) => {
                  if (!val) return true;
                  return (
                    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/i.test(
                      val
                    ) || "please enter a valid url"
                  );
                },
              })}
            />
            {websiteLinkErr?.message && (
              <p className="text-destructive">{websiteLinkErr.message}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="email"
              {...register("email", {
                required: "email is required",
                validate: (val) => {
                  return (
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                      val
                    ) || "please enter a valid email"
                  );
                },
              })}
            />
            {emailErr?.message && (
              <p className="text-destructive">{emailErr.message}</p>
            )}
          </div>
        </div>

        <div className="inputs-holder">
          <div>
            <Input
              placeholder="linkedin profile link"
              {...register("linkedinLink", {
                required: "linkedin profile Link is required",
                validate: (val) => {
                  return (
                    /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/.test(
                      val
                    ) || "please enter a valid linkedin profile url"
                  );
                },
              })}
            />
            {linkedinLinkErr?.message && (
              <p className="text-destructive">{linkedinLinkErr.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="github profile link"
              {...register("githubLink", {
                validate: (val) => {
                  if (!val) return true;

                  return (
                    /^https?:\/\/github.com\/([a-zA-Z0-9._-]+)/.test(val) ||
                    "please enter a valid github profile url"
                  );
                },
              })}
            />
            {githubLinkErr?.message && (
              <p className="text-destructive">{githubLinkErr.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Behance profile link"
              {...register("BehanceLink", {
                validate: (val) => {
                  if (!val) return true;
                  return (
                    /(http(s?):\/\/)?(www\.)?behance\.([a-z])+\/([A-Za-z0-9]{1,})/.test(
                      val
                    ) || "please enter a valid behance profile url"
                  );
                },
              })}
            />
            {BehanceLinkErr?.message && (
              <p className="text-destructive">{BehanceLinkErr.message}</p>
            )}
          </div>
        </div>

        <div className="inputs-holder">
          <div>
            <Textarea
              placeholder="About You"
              {...register("about", {
                required: "you need to type something about yourself",
              })}
            />
            {aboutErr?.message && (
              <p className="text-destructive">{aboutErr.message}</p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Education"
              {...register("education", {
                required: "you need to type something about your education",
              })}
            />
            {educationErr?.message && (
              <p className="text-destructive">{educationErr.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2 max-lg:flex-col">
          <InputsSection
            control={control}
            name="skills"
            addBtnContent="Add Skill"
            title="Your Skills"
            initialValue={initSkill}
            ListItem={(field, i, remove) => (
              <li key={field.id} className="flex gap-2 items-center">
                <Input
                  placeholder={`skill ${i + 1}`}
                  {...register(`skills.${i}.skill` as Path<TemplateDataType>)}
                />
                {i !== 0 && (
                  <Button
                    className="font-extrabold text-2xl"
                    variant="destructive"
                    onClick={() => remove(i)}
                    type="button"
                  >
                    -
                  </Button>
                )}
              </li>
            )}
            errorMsg={errors.skills?.message}
          />

          <InputsSection
            control={control}
            name="jobs"
            addBtnContent="Add Experince"
            title="Your Experince"
            initialValue={initJob}
            ListItem={(field, i, remove) => (
              <li key={field.id} className="flex gap-2 items-center">
                <Input
                  placeholder={`Job ${i + 1}`}
                  {...register(`jobs.${i}.job` as Path<TemplateDataType>)}
                />
                {i !== 0 && (
                  <Button
                    className="font-extrabold text-2xl"
                    variant="destructive"
                    onClick={() => remove(i)}
                    type="button"
                  >
                    -
                  </Button>
                )}
              </li>
            )}
          />
        </div>

        <div className="flex gap-2 max-lg:flex-col">
          <InputsSection
            control={control}
            name="projects"
            addBtnContent="Add Project"
            title="Your Projects"
            initialValue={initProject}
            ListItem={(field, i, remove) => (
              <li
                key={field.id}
                className="flex flex-col gap-2 bg-secondary-transparent bg-opacity-20 p-2 rounded-md border-secondary border-2"
              >
                <Input
                  placeholder={`project ${i + 1} name`}
                  {...register(`projects.${i}.name` as Path<TemplateDataType>)}
                />
                <Textarea
                  placeholder={`project ${i + 1} description`}
                  {...register(
                    `projects.${i}.description` as Path<TemplateDataType>
                  )}
                />
                {i !== 0 && (
                  <Button
                    variant="destructive"
                    onClick={() => remove(i)}
                    type="button"
                  >
                    Remove Project
                  </Button>
                )}
              </li>
            )}
            errorMsg={errors.projects?.message}
          />

          {templates[template].image && (
            <AddImage
              ref={addImageRef}
              image={image}
              setImage={setImage}
              initImgSrc={initImage?.img}
            />
          )}
        </div>

        <div className="flex gap-2 [&>*]:flex-1 flex-wrap pb-2">
          <Button
            onClick={() => {
              if (editMode.current) {
                if (initData) {
                  const finalData = JSON.parse(JSON.stringify({ ...initData }));
                  if (!finalData.jobs.length) finalData.jobs = [initJob];
                  reset(finalData);

                  setImage(null);
                  addImageRef.current?.setShowImg(true);
                }
              } else reset();
            }}
            disabled={isLoading}
            type="button"
          >
            Reset
          </Button>

          <Dialog>
            <Button
              className="flex gap-2"
              type="button"
              disabled={isLoading}
              asChild
            >
              <DialogTrigger>
                <FaEye size={25} />
                Final Preview
              </DialogTrigger>
            </Button>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="title">CV Preview</DialogTitle>

                <DialogDescription className="!mt-4">
                  <div className="min-h-[842px] w-[595px] the-shadow mx-auto mt-4 flex flex-col">
                    <PreviewTemplate
                      templateData={{
                        ...getValues(),
                        imgSrc: image
                          ? URL.createObjectURL(image)
                          : initImage?.img,
                      }}
                      dummy={false}
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button
            ref={submitBtnRef}
            className="flex gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <FaSave size={25} /> Save
              </>
            )}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default NewCVPage;
