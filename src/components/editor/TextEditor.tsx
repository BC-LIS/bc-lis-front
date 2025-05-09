"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function TextEditor({ theme }: { theme: string }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [editorHeight, setEditorHeight] = useState(550);

  useEffect(() => {
    // Establecer altura dinámica según tamaño de pantalla
    const updateHeight = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setEditorHeight(550); // móviles
      } else if (width < 768) {
        setEditorHeight(600); // tablets
      } else if (width < 1024) {
        setEditorHeight(700); // tablets horizontales o laptops chicas
      } else {
        setEditorHeight(550); // desktop
      }
    };

    updateHeight(); // Al cargar
    window.addEventListener("resize", updateHeight); // Al redimensionar

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="w-full rounded-lg shadow-md p-2 sm:p-4 text-gray-900">
      <JoditEditor
        ref={editor}
        value={content}
        config={{
          placeholder: "Escribe aquí...",
          readonly: false,
          height: editorHeight,
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
