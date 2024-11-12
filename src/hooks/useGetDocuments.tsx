import {  useEffect,  useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Document, DocumentsFilters } from "@/types/DocumentTypes";

const useFilteredDocuments = () => {
  const { toast } = useToast();

  const fetchFilteredDocuments = async (endpoint:string, filterParams:DocumentsFilters) => {
    try {
      const response = await fetch(`${endpoint}?${new URLSearchParams(filterParams).toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      });

      if (!response.ok) {
        toast({
          title: "Error ❌",
          description: "No se han podido mostrar los documentos, inténtalo nuevamente.",
        });
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      toast({
        title: "Error ❌",
        description: `Ha ocurrido un error en la solicitud`,
      });
      return [];
    }
  }
  return { fetchFilteredDocuments };
};

const useGetDocumentsID = ( endpoint:string, id:string ) => {
  const [document, setDocument] = useState<Document | null >(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`${endpoint}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("session")}`,
          },
        });

        if (!response.ok) {
          toast({
            title: "Error ❌",
            description: "No se han podido mostrar los documentos, inténtalo nuevamente.",
          });
          return;
        }

        const data = await response.json();
        setDocument(data);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error ❌",
          description: `Ha ocurrido un error en la solicitud`,
        });
      }
    };

    fetchDocuments();
  }, [id]);

  return { document, loading };
};

const useDownloadDocuments = ( endpoint:string, id:string ) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch(`${endpoint}/${id}/download`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("session")}`,
          },
        });

        if (!response.ok) {
          toast({
            title: "Error ❌",
            description: "No se ha podido abrir el documento, inténtalo nuevamente.",
          });
          return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        setPdfUrl(url);
      } catch (error) {
        toast({
          title: "Error ❌",
          description: `Ha ocurrido un error en la solicitud`,
        });
      }
    };

    fetchPdfs();
  }, [id]);

  return { pdfUrl, setPdfUrl };
};

export {
  useFilteredDocuments,
  useGetDocumentsID,
  useDownloadDocuments
}