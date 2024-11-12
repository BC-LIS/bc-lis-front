import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDownloadDocuments, useGetDocumentsID } from '@/hooks/useGetDocuments';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import CategoryCard from '@/components/ui/categoryCard';
import { getBadgeVariant } from '@/utils/badgeUtils';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';

interface ShowDocumentsProps {
  id: string;
}

const ShowDocuments: React.FC<ShowDocumentsProps> = ({ id }) => {

  const ENDPOINT_DOCUMENTS_ID = process.env.NEXT_PUBLIC_API_URL_DOCUMENTS;
  const { document, loading } = useGetDocumentsID(`${ENDPOINT_DOCUMENTS_ID}`, id);
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
  }

  return (
    <Card className='w-4/5 border flex flex-col'>
      <CardHeader className='flex flex-row border-b-2 shadow-sm justify-between'>
        <CardTitle className='text-4xl font-extrabold'>Detalles del Documento</CardTitle>
        <div className='flex gap-2'>
          <Badge variant={getBadgeVariant(document.state)}>{document.state}</Badge>
          <Button className='hover:bg-background'>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download={document.name}><DownloadIcon></DownloadIcon></a>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <LoadingSpinner size={48} />
          </div>
        ): (
          <div className='flex flex-col w-auto h-auto space-y-10 p-2 mt-2'>
            {/* Sección de titulo, nombre y descripción */}
            <div className='w-full flex justify-between'>
              <h2 className='text-3xl font-bold'>{document.name}</h2>
              <p className='flex font-semibold items-end'>{`${document.user.name} ${document.user.lastName} :`}<span className='font-light ml-2'> {document.type.name}</span></p>
            </div>
            <p>{document.description}</p>
            {/* Renderizado de categorias*/}
            <div className='flex flex-col gap-3'>
              <h1 className='font-semibold'>Categorias</h1>
              { document.categories.length > 0 ? (
                <CategoryCard 
                  categories={document.categories}
                />
              ) : (
                <Badge variant='default'>Sin categorías</Badge>
              )}
            </div>
            {/* Sección de creado y actualiado */}
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <p><span className='font-semibold'>Creado: </span>{`${new Date(document.createdAt).toDateString()} - ${new Date(document.createdAt).toLocaleTimeString()}`}</p>
                <p><span className='font-semibold'>Actualizado: </span>{`${new Date(document.updatedAt).toDateString()} - ${new Date(document.updatedAt).toLocaleTimeString()}`}</p>
              </div> 
              <Button variant='open' onClick={handleOpenPdf}>Abrir</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShowDocuments;