import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const Editor = () => {
  const [value, setValue] = useState("");
  return <MDEditor height={500} value={value} onChange={setValue} />;
};

export default Editor;
