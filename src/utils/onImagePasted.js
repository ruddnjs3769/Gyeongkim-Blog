import storageFileUpload from "../supabase/storageFileUpload";
import insertToTextArea from "./insertToTextArea";

const onImagePasted = async (dataTransfer, setMarkdown) => {
  const files = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      files.push(file);
    }
  }

  await Promise.all(
    files.map(async (file) => {
      const url = await storageFileUpload(file);
      const insertedMarkdown = insertToTextArea(`![](${url})`);
      if (!insertedMarkdown) {
        return;
      }
      setMarkdown(insertedMarkdown);
    })
  );
};

export default onImagePasted;
