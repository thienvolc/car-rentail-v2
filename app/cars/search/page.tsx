'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { CarFilters } from '@/features/cars/list/car-filters';
import { CarListSkeleton } from '@/features/cars/list/car-list-skeleton';
import { CarList } from '@/features/cars/list/car-list';
import { CarListHeader } from '@/features/cars/list/car-list-header';

export default function CarSearchPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [showFilters, setShowFilters] = React.useState(true);

  // Extract search parameters
  const location = searchParams.get('location');
  const carType = searchParams.get('carType');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  React.useEffect(() => {
    // Simulate API call to fetch cars based on search params
    const fetchCars = async () => {
      setIsLoading(true);
      // Mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchCars();
  }, [searchParams]);

  return (
    <div className='min-h-screen bg-white'>
      <div className='container px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <CarListHeader
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            totalResults={isLoading ? 0 : 18}
          />
        </div>

        {/* Main Content */}
        <div className='flex gap-8'>
          {/* Filters Sidebar */}
          <aside
            className={`transition-all duration-500 ease-in-out overflow-hidden flex-shrink-0 ${
              showFilters ? 'w-[300px] opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full'
            }`}
          >
            <div className='w-[300px]'>
              <CarFilters />
            </div>
          </aside>

          {/* Car Results */}
          <main className='flex-1 min-w-0'>
            {isLoading ? (
              <CarListSkeleton />
            ) : (
              <CarList
                searchParams={{
                  location,
                  carType,
                  pickupDate,
                  returnDate,
                }}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
