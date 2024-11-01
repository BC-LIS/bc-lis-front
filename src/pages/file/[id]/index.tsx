"use client";

import React from 'react'
import ShowDocuments from '@/components/layout/documents/ShowDocuments';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useRouter } from 'next/router';

export default function DocumentDetails() {
    const router = useRouter();
    const id = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;

    if (!id) {
        return (
          <div className="flex justify-center items-center h-screen">
            <LoadingSpinner size={48} />
          </div>
        );
      }

    return (
        <section className='flex items-center justify-center my-10 sm:p-4 h-full w-full'>
            <ShowDocuments id={id}/>
        </section>
    )
}