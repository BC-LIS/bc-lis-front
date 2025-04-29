"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function TextEditor({ theme }: { theme: string }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(content);
  }, [content]);

  return (
    <div className="font-sans w-full h-full rounded-lg shadow-md p-4 text-gray-900">
      <JoditEditor
        ref={editor}
        value={content}
        config={{
          placeholder: "Escribe aquí...",
          readonly: false,
          height: 500,
          language: "es",
          theme: theme,
          style: {
            background: theme === "dark" ? "#1a1a1a" : "#ffffff",
          },
          toolbarButtonSize: "middle",
          resizer: { showSize: false },
          removeButtons: [
            "source",
            "ai-assistant",
            "spellcheck",
            "preview",
            "classSpan",
          ],
        }}
        onBlur={(newContent) => setContent(newContent)}
      />
    </div>
  );
}

export default TextEditor;
