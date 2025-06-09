'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

// Mock data based on car_location table structure
const locations = [
  {
    id: 1,
    province: 'Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    address_details: 'Trung tâm thành phố',
  },
  { id: 2, province: 'Hồ Chí Minh', district: 'Quận 3', ward: 'Phường 1', address_details: 'Gần sân bay Tân Sơn Nhất' },
  { id: 3, province: 'Hà Nội', district: 'Quận Hoàn Kiếm', ward: 'Phường Hàng Bạc', address_details: 'Khu vực phố cổ' },
  {
    id: 4,
    province: 'Đà Nẵng',
    district: 'Quận Hải Châu',
    ward: 'Phường Hải Châu 1',
    address_details: 'Trung tâm thành phố',
  },
];

export function SearchBar() {
  const [pickupDate, setPickupDate] = React.useState<Date>();
  const [returnDate, setReturnDate] = React.useState<Date>();
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [locationOpen, setLocationOpen] = React.useState(false);
  const router = useRouter();

  const handleSearch = () => {
    // Build search params object, only include non-empty values
    const searchParams = new URLSearchParams();

    if (selectedLocation) {
      searchParams.append('location', selectedLocation);
    }

    if (pickupDate) {
      searchParams.append('pickupDate', pickupDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }

    if (returnDate) {
      searchParams.append('returnDate', returnDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }

    console.log('Search params:', Object.fromEntries(searchParams));

    // Redirect to search results page
    const queryString = searchParams.toString();
    const url = queryString ? `/cars/search?${queryString}` : '/cars/search';
    router.push(url);
  };

  return (
    <Card className='mx-auto w-full max-w-6xl shadow-lg'>
      <CardContent className='p-6'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {/* Location Picker */}
          <div className='md:col-span-2 lg:col-span-1'>
            <label className='text-sm font-medium text-muted-foreground'>Địa điểm nhận xe</label>
            <Popover open={locationOpen} onOpenChange={setLocationOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={locationOpen}
                  className='w-full justify-between mt-1 h-12'
                >
                  <div className='flex items-center'>
                    <MapPinIcon className='mr-2 h-4 w-4 text-muted-foreground' />
                    {selectedLocation ? (
                      <span className='truncate'>
                        {locations.find((loc) => loc.id.toString() === selectedLocation)?.province},{' '}
                        {locations.find((loc) => loc.id.toString() === selectedLocation)?.district}
                      </span>
                    ) : (
                      <span className='text-muted-foreground'>Chọn địa điểm</span>
                    )}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[400px] p-0'>
                <Command>
                  <CommandInput placeholder='Tìm kiếm địa điểm...' />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy địa điểm.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((location) => (
                        <CommandItem
                          key={location.id}
                          value={location.id.toString()}
                          onSelect={(currentValue) => {
                            setSelectedLocation(currentValue === selectedLocation ? '' : currentValue);
                            setLocationOpen(false);
                          }}
                        >
                          <div>
                            <div className='font-medium'>
                              {location.province}, {location.district}
                            </div>
                            <div className='text-sm text-muted-foreground'>{location.address_details}</div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Pickup Date */}
          <div>
            <label className='text-sm font-medium text-muted-foreground'>Ngày nhận</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' className='w-full justify-start mt-1 h-12'>
                  <CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
                  {pickupDate ? (
                    format(pickupDate, 'dd/MM/yyyy', { locale: vi })
                  ) : (
                    <span className='text-muted-foreground'>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          <div>
            <label className='text-sm font-medium text-muted-foreground'>Ngày trả</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' className='w-full justify-start mt-1 h-12'>
                  <CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
                  {returnDate ? (
                    format(returnDate, 'dd/MM/yyyy', { locale: vi })
                  ) : (
                    <span className='text-muted-foreground'>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={returnDate}
                  onSelect={setReturnDate}
                  disabled={(date) => date < (pickupDate || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <div className='flex items-end'>
            <Button onClick={handleSearch} size='lg' className='w-full h-12 mt-[21px]'>
              <SearchIcon className='mr-2 h-4 w-4' />
              Tìm xe
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}