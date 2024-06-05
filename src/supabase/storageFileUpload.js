import supabase from "./index";
import { v1 } from "uuid";

const storageFileUpload = async (file) => {
  const { data, error } = await supabase.storage
    .from("posts")
    .upload(`${v1()}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  if (error) {
    console.error(error);
    alert("사진 업로드 에러 발생");
    throw error;
  }
  console.log(data);
  return data.fullPath;
};

export default storageFileUpload;
