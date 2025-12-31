// utils
import { nanoid } from "nanoid";
import { toast } from "sonner";

// types
import type { Dispatch, SetStateAction } from "react";

// firebase
import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type Params = {
  image?: File;
  initImageId?: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const uploadImg = async ({ image, initImageId, setIsLoading }: Params) => {
  if (!image) return;

  try {
    const imgId = initImageId || nanoid();
    const { ref: getImgLink } = await uploadBytes(ref(storage, imgId), image);
    return { imgSrc: await getDownloadURL(getImgLink), imgId };
  } catch (e) {
    toast.error("something went wrong while upload your image");
    setIsLoading(false);
    return;
  }
};

export default uploadImg;
