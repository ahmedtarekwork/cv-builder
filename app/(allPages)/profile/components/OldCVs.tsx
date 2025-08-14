"use client";

// nextjs
import Link from "next/link";
import Image from "next/image";

// react
import { useContext, useEffect, useRef, useState } from "react";

// templates
import templates from "@/components/templates";

// components
import DownloadCVBtn from "./DownloadCVBtn";

// shadcn
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

// context
import { userContext } from "@/context/UserContext";

// firebase
import { db, storage } from "@/config/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

// types
import type { TemplateDataType } from "../../cv-form/page";

// icons
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

// utils
import { toast } from "sonner";

const OldCVs = () => {
  const loadingElRef = useRef<HTMLParagraphElement>(null);

  const { user } = useContext(userContext);
  const [userTemplates, setTemplates] = useState<
    (TemplateDataType & {
      id: string;
      templateIndex: number;
      userId: string;
      projectName: string;
      imgId: string;
      createdAt: unknown;
    })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingEl = loadingElRef.current;
    if (loadingEl) {
      loadingEl.style.margin = `${loadingEl.offsetWidth / 2}px auto`;
    }
  }, []);

  useEffect(() => {
    if (user) {
      const colRef = query(
        collection(db, "CVs"),
        where("userId", "==", user.id),
        orderBy("createdAt", "desc")
      );

      onSnapshot(colRef, (templates) => {
        const docs = templates.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTemplates(docs as typeof userTemplates);
        if (isLoading) setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isLoading)
    return (
      <p
        ref={loadingElRef}
        className="text-center loading-text-animation text-primary font-bold text-2xl p-4 mx-auto"
      >
        <span>Loading Your CVs...</span>
      </p>
    );

  if (!userTemplates.length)
    return (
      <>
        <Image
          src="empty.svg"
          alt="empty"
          width={200}
          height={200}
          className="mx-auto w-full max-w-full h-[400px] object-contain aspect-[1]"
        />
        <p className="text-primary font-bold text-2xl mt-2 text-center">
          No CVs has been created to show!
        </p>
      </>
    );

  return (
    <div className="mt-4">
      <h1 className="title mb-4">Old CVs</h1>

      <ul
        className="sm:grid sm:gap-4 max-sm:space-y-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
        }}
      >
        {userTemplates.map(
          ({ templateIndex, userId, id, projectName, imgId, ...data }) => {
            const { template: SelectedTemplate } =
              templates[templateIndex.toString() as keyof typeof templates];

            return (
              <li
                key={id}
                className="bg-white flex flex-col gap-4 p-4 the-shadow border-2 border-primary-transparent bg-opacity-50 rounded-md"
              >
                <h2 className="title capitalize">
                  {projectName || "untitled"}
                </h2>

                <div className="flex justify-between flex-wrap gap-2 [&>*]:flex-1 [&>*]:!py-6">
                  <DownloadCVBtn data={data} templateIndex={templateIndex} />

                  <Button
                    onClick={() =>
                      window.open(`/downloadCV?CVID=${id}`, "_blank")
                    }
                  >
                    <FaEye size={24} />
                  </Button>

                  <Button asChild>
                    <Link href={`/cv-form?id=${id}`}>
                      <FaPen size={24} />
                    </Link>
                  </Button>

                  <AlertDialog>
                    <Button asChild variant="destructive">
                      <AlertDialogTrigger>
                        <FaTrash size={24} />
                      </AlertDialogTrigger>
                    </Button>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You will remove this Resume forever, this action
                          {" can't"} be undoed!
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <Button asChild variant="destructive">
                          <AlertDialogAction
                            onClick={async () => {
                              try {
                                const docRef = doc(db, "CVs", id);
                                await deleteDoc(docRef);

                                if (imgId) {
                                  const imgRef = ref(storage, imgId);
                                  await deleteObject(imgRef);
                                }
                                toast.success("Resume delete successfully");
                              } catch (error) {
                                toast.error(
                                  "something went wrong while deleting this resume"
                                );
                              }
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <div className="flex flex-col flex-1 rounded-md overflow-hidden border border-slate-600 max-h-[750px] down-shadow">
                  <SelectedTemplate
                    dummy={false}
                    templateData={data}
                    turnDummyInSmallScreens
                  />
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};
export default OldCVs;
