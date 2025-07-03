"use client";

import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useRouter } from "next/router";
import { useGetDocumentsID } from "@/hooks/useGetDocuments";

const ShowFile = dynamic(
  () => import("@/components/layout/documents/ShowFile")
);
const ShowDocument = dynamic(
  () => import("@/components/layout/documents/ShowDocument")
);

export default function DocumentDetails() {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  const ENDPOINT_DOCUMENTS_ID =
    process.env.NEXT_PUBLIC_API_URL_DOCUMENT_REGISTER;
  const { document, loading } = useGetDocumentsID(
    `${ENDPOINT_DOCUMENTS_ID}`,
    id || ""
  );

  if (!id || loading || !document) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  const ComponentToRender = document.editable ? ShowDocument : ShowFile;

  return (
    <section className="flex items-center justify-center my-10 sm:p-4 h-full w-full">
      <ComponentToRender id={id} />
    </section>
  );
}
