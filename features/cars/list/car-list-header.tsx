'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SlidersHorizontal, Grid3X3, Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CarFilters } from './car-filters';

interface CarListHeaderProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  totalResults: number;
}

export function CarListHeader({ showFilters, onToggleFilters, totalResults }: CarListHeaderProps) {
  const [sortBy, setSortBy] = React.useState('price_asc');

  return (
    <div className='space-y-4'>
      {/* Title */}
      <div>
        <h1 className='text-2xl font-bold'>Xe cho thuê ({totalResults})</h1>
        <p className='text-muted-foreground'>Tìm kiếm xe phù hợp với nhu cầu của bạn</p>
      </div>

      {/* Controls Bar */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* Hide/Show Filters Button - Desktop */}
          <Button
            variant='outline'
            size='sm'
            onClick={onToggleFilters}
            className='hidden lg:flex items-center gap-2'
          >
            <SlidersHorizontal className='h-4 w-4' />
            {showFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
          </Button>

          {/* Mobile Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='sm' className='lg:hidden flex items-center gap-2'>
                <Filter className='h-4 w-4' />
                Bộ lọc
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-80 overflow-y-auto'>
              <SheetHeader>
                <SheetTitle>Bộ lọc tìm kiếm</SheetTitle>
              </SheetHeader>
              <div className='mt-6'>
                <CarFilters />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Sort Dropdown */}
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground hidden sm:block'>Sắp xếp theo:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='price_asc'>Giá: Thấp đến cao</SelectItem>
              <SelectItem value='price_desc'>Giá: Cao đến thấp</SelectItem>
              <SelectItem value='rating_desc'>Đánh giá cao nhất</SelectItem>
              <SelectItem value='newest'>Mới nhất</SelectItem>
              <SelectItem value='popular'>Phổ biến nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}