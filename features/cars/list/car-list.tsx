'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPinIcon, FuelIcon, SettingsIcon, UsersIcon, ShieldCheckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { MockCar, mockCars } from './mock-car';

interface CarListProps {
  searchParams: {
    location?: string | null;
    carType?: string | null;
    pickupDate?: string | null;
    returnDate?: string | null;
  };
}

export function CarList({ searchParams }: CarListProps) {
  const [cars, setCars] = React.useState<MockCar[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const CARS_PER_PAGE = 12;

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Load initial cars
  React.useEffect(() => {
    const initialCars: MockCar[] = mockCars.slice(0, CARS_PER_PAGE);
    setCars(initialCars);
    setPage(1);
    setHasMore(mockCars.length > CARS_PER_PAGE);
  }, [searchParams]);

  // Load more cars when scrolling
  React.useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMoreCars();
    }
  }, [inView, loading, hasMore]);

  const loadMoreCars = async () => {
    if (loading) return;

    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * CARS_PER_PAGE;
    const endIndex = startIndex + CARS_PER_PAGE;
    const newCars = mockCars.slice(startIndex, endIndex);

    if (newCars.length === 0) {
      setHasMore(false);
    } else {
      setCars((prev) => [...prev, ...newCars]);
      setPage(nextPage);

      // Check if we've reached the end
      if (endIndex >= mockCars.length) {
        setHasMore(false);
      }
    }

    setLoading(false);
  };

  const getFuelTypeLabel = (fuelType: string) => {
    const fuelTypes: Record<string, string> = {
      gasoline: 'Xăng',
      diesel: 'Dầu',
      electric: 'Điện',
      hybrid: 'Hybrid',
    };
    return fuelTypes[fuelType] || fuelType;
  };

  const getTransmissionLabel = (transmission: string) => {
    return transmission === 'automatic' ? 'Số tự động' : 'Số sàn';
  };

  return (
    <div className='space-y-8'>
      {/* Car Grid - 3 columns */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {cars.map((car, index) => (
          <Card
            key={`${car.id}-${index}`}
            className='overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-sm'
          >
            <CardContent className='p-0'>
              {/* Car Image */}
              <div className='relative'>
                <div className='aspect-[4/3] relative overflow-hidden'>
                  <Image
                    src={car.images[0] || '/avator-placeholder.png'}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  {/* Badges */}
                  <div className='absolute top-3 left-3 flex flex-col gap-1'>
                    {car.instant_booking && <Badge className='bg-green-500 hover:bg-green-600 text-xs'>Đặt ngay</Badge>}
                    {car.delivery && (
                      <Badge variant='secondary' className='text-xs'>
                        Giao xe
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Car Details */}
              <div className='p-4 space-y-3'>
                {/* Title and Price */}
                <div className='space-y-1'>
                  <h3 className='font-semibold text-lg leading-tight'>
                    {car.brand} {car.model} {car.year_of_manufacture}
                  </h3>
                  <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                    <MapPinIcon className='h-3 w-3' />
                    <span className='truncate'>{car.location.district}</span>
                  </div>
                </div>

                {/* Car Specs */}
                <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <UsersIcon className='h-3 w-3' />
                    <span>{car.number_of_seats} chỗ</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <SettingsIcon className='h-3 w-3' />
                    <span>{getTransmissionLabel(car.transmission_type)}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <FuelIcon className='h-3 w-3' />
                    <span>{getFuelTypeLabel(car.fuel_type)}</span>
                  </div>
                </div>

                {/* Owner Info */}
                <div className='flex items-center gap-2 pt-2'>
                  <Avatar className='h-5 w-5'>
                    <AvatarImage src={car.owner.avatar_url} />
                    <AvatarFallback className='text-xs'>{car.owner.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className='flex items-center gap-1 flex-1 min-w-0'>
                    <span className='text-sm font-medium truncate'>{car.owner.username}</span>
                    {car.owner.verified && <ShieldCheckIcon className='h-3 w-3 text-blue-500 flex-shrink-0' />}
                  </div>
                </div>

                {/* Price */}
                <div className='pt-2 border-t'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <span className='text-lg font-bold text-green-600'>
                        {car.base_price_per_day.toLocaleString('vi-VN')}₫
                      </span>
                      <span className='text-sm text-muted-foreground ml-1'>/ ngày</span>
                    </div>
                    <Button size='sm' className='text-xs h-8' asChild>
                      <Link href={`/cars/${car.id}`}>Thuê ngay</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className='flex justify-center py-8'>
          <div className='flex items-center gap-2'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
            <span className='text-sm text-muted-foreground'>Đang tải thêm xe...</span>
          </div>
        </div>
      )}

      {/* Infinite scroll trigger */}
      {hasMore && !loading && (
        <div ref={ref} className='h-20 flex items-center justify-center'>
          <div className='w-full max-w-md h-px bg-border'></div>
        </div>
      )}

      {/* No more cars */}
      {!hasMore && !loading && cars.length > 0 && (
        <div className='text-center py-12 text-muted-foreground'>
          <div className='space-y-2'>
            <p className='text-lg font-medium'>Đã hiển thị tất cả xe có sẵn</p>
            <p className='text-sm'>Tổng cộng {cars.length} xe được tìm thấy</p>
          </div>
        </div>
      )}

      {/* No cars found */}
      {cars.length === 0 && !loading && (
        <div className='text-center py-12 text-muted-foreground'>
          <div className='space-y-2'>
            <p className='text-lg font-medium'>Không tìm thấy xe nào</p>
            <p className='text-sm'>Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        </div>
      )}
    </div>
  );
}
