'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FilterIcon, RotateCcwIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

// Based on car table schema
const brands = ['Toyota', 'Honda', 'Mazda', 'Hyundai', 'KIA', 'Ford', 'Chevrolet', 'Nissan'];
const fuelTypes = [
  { value: 'gasoline', label: 'Xăng' },
  { value: 'diesel', label: 'Dầu' },
  { value: 'electric', label: 'Điện' },
  { value: 'hybrid', label: 'Hybrid' },
];
const transmissionTypes = [
  { value: 'manual', label: 'Số sàn' },
  { value: 'automatic', label: 'Số tự động' },
];
const seatCounts = [4, 5, 7, 9];

export function CarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = React.useState([0, 2000000]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = React.useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = React.useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = React.useState<number[]>([]);

  // Collapsible states
  const [isPriceOpen, setIsPriceOpen] = React.useState(true);
  const [isBrandOpen, setIsBrandOpen] = React.useState(true);
  const [isFuelOpen, setIsFuelOpen] = React.useState(false);
  const [isTransmissionOpen, setIsTransmissionOpen] = React.useState(false);
  const [isSeatsOpen, setIsSeatsOpen] = React.useState(false);

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    }
  };

  const handleFuelTypeChange = (fuelType: string, checked: boolean) => {
    if (checked) {
      setSelectedFuelTypes([...selectedFuelTypes, fuelType]);
    } else {
      setSelectedFuelTypes(selectedFuelTypes.filter((f) => f !== fuelType));
    }
  };

  const handleTransmissionChange = (transmission: string, checked: boolean) => {
    if (checked) {
      setSelectedTransmission([...selectedTransmission, transmission]);
    } else {
      setSelectedTransmission(selectedTransmission.filter((t) => t !== transmission));
    }
  };

  const handleSeatChange = (seats: number, checked: boolean) => {
    if (checked) {
      setSelectedSeats([...selectedSeats, seats]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s !== seats));
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Add filter params
    if (selectedBrands.length > 0) {
      params.set('brands', selectedBrands.join(','));
    } else {
      params.delete('brands');
    }
    if (selectedFuelTypes.length > 0) {
      params.set('fuelTypes', selectedFuelTypes.join(','));
    } else {
      params.delete('fuelTypes');
    }
    if (selectedTransmission.length > 0) {
      params.set('transmission', selectedTransmission.join(','));
    } else {
      params.delete('transmission');
    }
    if (selectedSeats.length > 0) {
      params.set('seats', selectedSeats.join(','));
    } else {
      params.delete('seats');
    }

    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());

    router.push(`/cars/search?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    // Keep original search params
    const location = searchParams.get('location');
    const carType = searchParams.get('carType');
    const pickupDate = searchParams.get('pickupDate');
    const returnDate = searchParams.get('returnDate');

    if (location) params.set('location', location);
    if (carType) params.set('carType', carType);
    if (pickupDate) params.set('pickupDate', pickupDate);
    if (returnDate) params.set('returnDate', returnDate);

    // Reset local state
    setPriceRange([0, 2000000]);
    setSelectedBrands([]);
    setSelectedFuelTypes([]);
    setSelectedTransmission([]);
    setSelectedSeats([]);

    router.push(`/cars/search?${params.toString()}`);
  };

  const FilterSection = ({
    title,
    isOpen,
    onToggle,
    children,
    count = 0,
  }: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    count?: number;
  }) => (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <Button
          variant='ghost'
          className='w-full justify-between p-0 h-auto font-medium text-left hover:bg-transparent'
        >
          <div className='flex items-center gap-2'>
            <span>{title}</span>
            {count > 0 && (
              <Badge variant='secondary' className='text-xs'>
                {count}
              </Badge>
            )}
          </div>
          {isOpen ? (
            <ChevronUpIcon className='h-4 w-4 transition-transform duration-200' />
          ) : (
            <ChevronDownIcon className='h-4 w-4 transition-transform duration-200' />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='transition-all duration-300 ease-in-out overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
        <div className='pt-3'>{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <Card className='border-0 shadow-sm h-fit'>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <FilterIcon className='h-5 w-5' />
          Bộ lọc
        </CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <ScrollArea className='max-h-[calc(100vh-200px)] px-6'>
          <div className='space-y-6 pb-6'>
            {/* Price Range */}
            <FilterSection title='Khoảng giá' isOpen={isPriceOpen} onToggle={() => setIsPriceOpen(!isPriceOpen)}>
              <div className='px-2'>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={2000000}
                  min={0}
                  step={50000}
                  className='w-full'
                />
                <div className='flex justify-between mt-2 text-sm text-muted-foreground'>
                  <span>{priceRange[0].toLocaleString('vi-VN')}₫</span>
                  <span>{priceRange[1].toLocaleString('vi-VN')}₫</span>
                </div>
              </div>
            </FilterSection>

            <Separator />

            {/* Car Brand */}
            <FilterSection
              title='Hãng xe'
              isOpen={isBrandOpen}
              onToggle={() => setIsBrandOpen(!isBrandOpen)}
              count={selectedBrands.length}
            >
              <div className='space-y-3 max-h-48 overflow-y-auto'>
                {brands.map((brand) => (
                  <div key={brand} className='flex items-center space-x-2'>
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => handleBrandChange(brand, !!checked)}
                    />
                    <Label htmlFor={`brand-${brand}`} className='text-sm font-normal cursor-pointer'>
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <Separator />

            {/* Fuel Type */}
            <FilterSection
              title='Loại nhiên liệu'
              isOpen={isFuelOpen}
              onToggle={() => setIsFuelOpen(!isFuelOpen)}
              count={selectedFuelTypes.length}
            >
              <div className='space-y-3'>
                {fuelTypes.map((fuel) => (
                  <div key={fuel.value} className='flex items-center space-x-2'>
                    <Checkbox
                      id={`fuel-${fuel.value}`}
                      checked={selectedFuelTypes.includes(fuel.value)}
                      onCheckedChange={(checked) => handleFuelTypeChange(fuel.value, !!checked)}
                    />
                    <Label htmlFor={`fuel-${fuel.value}`} className='text-sm font-normal cursor-pointer'>
                      {fuel.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <Separator />

            {/* Transmission */}
            <FilterSection
              title='Hộp số'
              isOpen={isTransmissionOpen}
              onToggle={() => setIsTransmissionOpen(!isTransmissionOpen)}
              count={selectedTransmission.length}
            >
              <div className='space-y-3'>
                {transmissionTypes.map((transmission) => (
                  <div key={transmission.value} className='flex items-center space-x-2'>
                    <Checkbox
                      id={`transmission-${transmission.value}`}
                      checked={selectedTransmission.includes(transmission.value)}
                      onCheckedChange={(checked) => handleTransmissionChange(transmission.value, !!checked)}
                    />
                    <Label
                      htmlFor={`transmission-${transmission.value}`}
                      className='text-sm font-normal cursor-pointer'
                    >
                      {transmission.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <Separator />

            {/* Number of Seats */}
            <FilterSection
              title='Số chỗ ngồi'
              isOpen={isSeatsOpen}
              onToggle={() => setIsSeatsOpen(!isSeatsOpen)}
              count={selectedSeats.length}
            >
              <div className='space-y-3'>
                {seatCounts.map((seats) => (
                  <div key={seats} className='flex items-center space-x-2'>
                    <Checkbox
                      id={`seats-${seats}`}
                      checked={selectedSeats.includes(seats)}
                      onCheckedChange={(checked) => handleSeatChange(seats, !!checked)}
                    />
                    <Label htmlFor={`seats-${seats}`} className='text-sm font-normal cursor-pointer'>
                      {seats} chỗ
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>

            <Separator />

            {/* Action Buttons */}
            <div className='space-y-2 pt-2'>
              <Button onClick={applyFilters} className='w-full'>
                Áp dụng bộ lọc
              </Button>
              <Button onClick={clearFilters} variant='outline' className='w-full'>
                <RotateCcwIcon className='mr-2 h-4 w-4' />
                Xóa bộ lọc
              </Button>
            </div>

            {/* Active Filters */}
            {(selectedBrands.length > 0 ||
              selectedFuelTypes.length > 0 ||
              selectedTransmission.length > 0 ||
              selectedSeats.length > 0) && (
              <>
                <Separator />
                <div>
                  <Label className='text-sm font-medium'>Bộ lọc đang áp dụng</Label>
                  <div className='mt-2 flex flex-wrap gap-1'>
                    {selectedBrands.map((brand) => (
                      <Badge key={brand} variant='secondary' className='text-xs'>
                        {brand}
                      </Badge>
                    ))}
                    {selectedFuelTypes.map((fuel) => (
                      <Badge key={fuel} variant='secondary' className='text-xs'>
                        {fuelTypes.find((f) => f.value === fuel)?.label}
                      </Badge>
                    ))}
                    {selectedTransmission.map((trans) => (
                      <Badge key={trans} variant='secondary' className='text-xs'>
                        {transmissionTypes.find((t) => t.value === trans)?.label}
                      </Badge>
                    ))}
                    {selectedSeats.map((seats) => (
                      <Badge key={seats} variant='secondary' className='text-xs'>
                        {seats} chỗ
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
