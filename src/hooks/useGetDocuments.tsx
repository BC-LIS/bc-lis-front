import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Document } from "@/types/DocumentTypes";

const useGetDocuments = ( endpoint:string ) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(endpoint, {
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
        setDocuments(data);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error ❌",
          description: `Ha ocurrido un error en la solicitud`,
        });
      }
    };

    fetchDocuments();
  }, [endpoint, toast]);

  return { documents, loading };
};

const useGetDocumentsID = ( endpoint:string, id:string ) => {
  const [document, setDocument] = useState<Document>({
    id: 0,
    type_id: 0,
    user_id: 0,
    name: '',
    description: '',
    objectName: '',
    state: 'DRAFT',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
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
  }, [endpoint, id, toast]);

  return { document, loading };
};

export {
  useGetDocuments,
  useGetDocumentsID
}