import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetDocumentsID } from '@/hooks/useGetDocuments';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ShowDocumentsProps {
  id: string;
}

const ShowDocuments: React.FC<ShowDocumentsProps> = ({ id }) => {

  const ENDPOINT_DOCUMENTS_ID = process.env.NEXT_PUBLIC_API_URL_DOCUMENTS;
  const { document, loading } = useGetDocumentsID(`${ENDPOINT_DOCUMENTS_ID}`, id);

  console.log(document);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles del Documento</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col'>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <LoadingSpinner size={48} />
          </div>
        ): (
          <div>
            <h2 className='text-lg'> nombre: {document.name}</h2>
            <p>{document.description}</p>
            <Badge variant="default">{document.state}</Badge>
            <p>Creado: {new Date(document.createdAt).toLocaleDateString()}</p>
            <p>Actualizado: {new Date(document.updatedAt).toLocaleDateString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShowDocuments;