import { MenuBarType } from "@/types/TextEditor";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import React from "react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options: MenuBarType[] = [
    {
      label: "Título 1",
      icon: <Heading1 className="w-24 h-24" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      label: "Título 2",
      icon: <Heading2 className="w-24 h-24" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "Título 3",
      icon: <Heading3 className="w-24 h-24" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      label: "Negrita",
      icon: <Bold className="w-24 h-24" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      label: "Italica",
      icon: <Italic className="w-24 h-24" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      label: "Tachado",
      icon: <Strikethrough className="w-24 h-24" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      label: "Alinear izquierda",
      icon: <AlignLeft className="w-24 h-24" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
    },
    {
      label: "Alinear centro",
      icon: <AlignCenter className="w-24 h-24" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      label: "Alinear derecha",
      icon: <AlignRight className="w-24 h-24" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
    },
    {
      label: "Lista",
      icon: <List className="w-24 h-24" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      label: "Lista ordenada",
      icon: <ListOrdered className="w-24 h-24" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      label: "Resaltar",
      icon: <Highlighter className="w-24 h-24" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive("highlight"),
    },
  ];

  return (
    <div className="border rounded-md p-2 mb-2 backdrop-blur-lg backdrop-opacity-60 shadow-lg flex flex-wrap gap-4 w-max">
      {Options.map((option, index) => (
        <Toggle
          value={option.label}
          key={index}
          pressed={option.isActive}
          onPressedChange={option.onClick}
          size={"lg"}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
