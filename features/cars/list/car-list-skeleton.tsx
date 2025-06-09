import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CarListSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Car Grid Skeleton - 3 columns */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className='overflow-hidden border-0 shadow-sm'>
            <CardContent className='p-0'>
              {/* Image Skeleton */}
              <Skeleton className='aspect-[4/3] w-full' />

              {/* Content Skeleton */}
              <div className='p-4 space-y-3'>
                {/* Title */}
                <div className='space-y-1'>
                  <Skeleton className='h-6 w-48' />
                  <Skeleton className='h-4 w-32' />
                </div>

                {/* Specs */}
                <div className='flex gap-3'>
                  <Skeleton className='h-4 w-12' />
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-12' />
                </div>

                {/* Owner */}
                <div className='flex items-center gap-2 pt-2'>
                  <Skeleton className='h-5 w-5 rounded-full' />
                  <Skeleton className='h-4 w-20' />
                </div>

                {/* Price */}
                <div className='pt-2 border-t'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                      <Skeleton className='h-6 w-24' />
                    </div>
                    <Skeleton className='h-8 w-20' />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
