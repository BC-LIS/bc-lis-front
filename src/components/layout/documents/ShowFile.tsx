import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useDownloadDocuments,
  useGetDocumentsID,
} from "@/hooks/useGetDocuments";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import CategoryCard from "@/components/ui/categoryCard";
import { getBadgeVariant } from "@/utils/badgeUtils";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { CommentList } from "@/components/layout/comments/CommentList";

interface ShowDocumentsProps {
  id: string;
}

const ShowDocuments: React.FC<ShowDocumentsProps> = ({ id }) => {
  const ENDPOINT_DOCUMENTS_ID =
    process.env.NEXT_PUBLIC_API_URL_DOCUMENT_REGISTER;
  const { document, loading } = useGetDocumentsID(
    `${ENDPOINT_DOCUMENTS_ID}`,
    id
  );
  const { pdfUrl } = useDownloadDocuments(`${ENDPOINT_DOCUMENTS_ID}`, id);

  if (!document) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  const handleOpenPdf = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <Card className="w-full max-w-4xl border flex flex-col px-4 sm:px-8 py-4 mx-auto">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 border-b-2 shadow-sm">
        <CardTitle className="text-2xl sm:text-4xl font-extrabold text-center sm:text-left">
          Detalles del Documento
        </CardTitle>
        <div className="flex gap-2 justify-center sm:justify-end">
          <Badge variant={getBadgeVariant(document.state)}>
            {document.state}
          </Badge>
          <Button className="hover:bg-background p-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={document.name}
            >
              <DownloadIcon className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <LoadingSpinner size={48} />
          </div>
        ) : (
          <div className="flex flex-col space-y-8 p-2 mt-2">
            {/* Título y usuario */}
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <h2 className="text-xl sm:text-3xl font-bold">{document.name}</h2>
              <p className="text-sm sm:text-base font-semibold flex items-end">
                {`${document.user.username}: `}
                <span className="font-light ml-2">{document.type.name}</span>
              </p>
            </div>

            {/* Descripción */}
            <p className="text-sm sm:text-base text-justify whitespace-pre-line">
              {document.description}
            </p>

            {/* Categorías */}
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-base sm:text-lg">Categorías</h1>
              {document.categories.length > 0 ? (
                <CategoryCard categories={document.categories} />
              ) : (
                <Badge variant="default">Sin categorías</Badge>
              )}
            </div>

            {/* Fechas */}
            <div className="flex flex-col gap-2 text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <p>
                  <span className="font-semibold">Creado: </span>
                  {`${new Date(document.createdAt).toDateString()} - ${new Date(
                    document.createdAt
                  ).toLocaleTimeString()}`}
                </p>
                <p>
                  <span className="font-semibold">Actualizado: </span>
                  {`${new Date(document.updatedAt).toDateString()} - ${new Date(
                    document.updatedAt
                  ).toLocaleTimeString()}`}
                </p>
              </div>
              <Button variant="open" onClick={handleOpenPdf}>
                Abrir
              </Button>
            </div>
          </div>
        )}
      </CardContent>

      <div className="flex flex-col items-center justify-center px-2 sm:px-6 pb-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Comentarios</h2>
        <CommentList documentId={document.id} />
      </div>
    </Card>
  );
};

export default ShowDocuments;
