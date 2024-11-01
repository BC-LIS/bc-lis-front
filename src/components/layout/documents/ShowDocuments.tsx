import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetDocumentsID } from '@/hooks/useGetDocuments';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import CategoryCard from '@/components/ui/categoryCard';
import { getBadgeVariant } from '@/utils/badgeUtils';
import { Button } from '@/components/ui/button';

interface ShowDocumentsProps {
  id: string;
}

const ShowDocuments: React.FC<ShowDocumentsProps> = ({ id }) => {

  const ENDPOINT_DOCUMENTS_ID = process.env.NEXT_PUBLIC_API_URL_DOCUMENTS;
  const { document, loading } = useGetDocumentsID(`${ENDPOINT_DOCUMENTS_ID}`, id);
  console.log(document);

  return (
    <Card className='w-4/5 border flex flex-col'>
      <CardHeader className='flex flex-row border-b-2 shadow-sm justify-between'>
        <CardTitle className='text-4xl font-extrabold'>Detalles del Documento</CardTitle>
        <Badge variant={getBadgeVariant(document.state)}>{document.state}</Badge>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <LoadingSpinner size={48} />
          </div>
        ): (
          <div className='flex flex-col w-auto h-auto space-y-5 p-2 mt-2'>
            <div className='w-full flex justify-between'>
              <h2 className='text-3xl font-bold'>{document.name}</h2>
              <p className='flex font-semibold items-end'>{`${document.user.username}:`}<span className='font-light ml-2'> {document.type.name}</span></p>
            </div>
            <p>{document.description}</p>
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
            <div className='flex justify-between'>
              <p><span className='font-semibold'>Creado: </span>{new Date(document.createdAt).toLocaleDateString()}</p>
              <p><span className='font-semibold'>Actualizado: </span>{new Date(document.updatedAt).toLocaleDateString()}</p>
            </div>
            <Button variant='download'>Descargar</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShowDocuments;