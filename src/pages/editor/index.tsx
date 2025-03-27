"use client";

import TextEditor from "@/components/editor/TextEditor";
import React, { useState } from "react";

export default function Editor() {
  const [post, setPost] = useState("");

  const onChange = (content: string) => {
    setPost(content);
    console.log(content);
  };

  return (
    <div className="container mx-auto my-8">
      <TextEditor content={post} onChange={onChange} />
    </div>
  );
}
