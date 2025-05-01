"use client";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  theme: string;
}

function TextEditor({ value, onChange, theme }: TextEditorProps) {
  const editor = useRef(null);

  return (
    <div className="font-sans w-full h-full rounded-lg shadow-md text-gray-900">
      <JoditEditor
        ref={editor}
        value={value}
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
        onBlur={(newContent) => onChange(newContent)}
      />
    </div>
  );
}

export default TextEditor;
