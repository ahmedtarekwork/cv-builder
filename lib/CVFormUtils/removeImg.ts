// types
import type { Dispatch, SetStateAction } from "react";

// utils
import { toast } from "sonner";

// firebase
import { storage } from "@/config/firebaseConfig";
import { deleteField } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

type Params = {
  image?: File;
  isShowImg: boolean;
  initImgId?: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
const removeImg = async ({
  setIsLoading,
  image,
  isShowImg,
  initImgId,
}: Params) => {
  if (!image && !isShowImg && initImgId) {
    try {
      await deleteObject(ref(storage, initImgId));
      return { imgSrc: deleteField(), imgId: deleteField() };
    } catch (e) {
      toast.error("something went wrong while deleting your image");
      setIsLoading(false);
    }
  }
};

export default removeImg;
