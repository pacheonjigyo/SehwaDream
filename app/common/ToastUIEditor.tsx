import * as React from "react";

import { Editor } from "@toast-ui/editor";
import { ToastUIEditorProps } from "../types.js";

import "@toast-ui/editor/dist/toastui-editor.css";

export function ToastUIEditor({ initialValue, onBlur }: ToastUIEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const editorInstanceRef = React.useRef<Editor | null>(null);

  React.useEffect(() => {
    editorInstanceRef.current = new Editor({
      el: editorRef.current,
      initialEditType: "wysiwyg",
      initialValue,
      events: {
        blur: () => {
          onBlur(editorInstanceRef.current.getHTML());
        },
      },
    });

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={editorRef} />;
}
