'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MapPinIcon,
  FuelIcon,
  SettingsIcon,
  UsersIcon,
  ShieldCheckIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  CarIcon,
  ArrowLeftIcon,
  PhoneIcon,
  MessageCircleIcon,
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { MockCar, mockCars } from '../list/mock-car';
import { useRouter } from 'next/navigation';

export default function CarDetail({ id }: { id: string }) {
  const router = useRouter();

  const [pickupDate, setPickupDate] = React.useState<Date>();
  const [returnDate, setReturnDate] = React.useState<Date>();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  // Find car from mock data
  const car: MockCar | undefined = mockCars.find((c) => c.id.toString() === id);

  if (!car) {
    return (
      <div className='container mx-auto py-8 px-4'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Xe không tồn tại</h1>
          <Button onClick={() => router.back()}>Quay lại</Button>
        </div>
      </div>
    );
  }

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    return Math.max(1, differenceInDays(returnDate, pickupDate));
  };

  const calculateTotal = () => {
    const days = calculateDays();
    return days * car.base_price_per_day;
  };

  const handleBooking = () => {
    if (!pickupDate || !returnDate) {
      alert('Vui lòng chọn ngày nhận và trả xe');
      return;
    }

    // Handle booking logic here
    alert(`Đặt xe thành công!\nTổng tiền: ${calculateTotal().toLocaleString('vi-VN')}₫`);
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
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto py-8 px-4'>
        {/* Back Button */}
        <Button variant='ghost' onClick={() => router.back()} className='mb-6 hover:bg-gray-100'>
          <ArrowLeftIcon className='h-4 w-4 mr-2' />
          Quay lại
        </Button>

        <div className='grid gap-8 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Car Images */}
            <Card>
              <CardContent className='p-0'>
                <div className='aspect-[16/10] relative overflow-hidden rounded-t-lg'>
                  <Image
                    src={car.images[selectedImageIndex]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className='object-cover'
                  />
                </div>

                {/* Image Thumbnails */}
                <div className='p-4'>
                  <div className='flex gap-2 overflow-x-auto'>
                    {car.images.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative w-20 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${
                          index === selectedImageIndex ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${car.brand} ${car.model} ${index + 1}`}
                          fill
                          className='object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Car Info */}
            <Card>
              <CardHeader>
                <CardTitle className='text-2xl'>
                  {car.brand} {car.model} {car.year_of_manufacture}
                </CardTitle>
                <div className='flex items-center gap-4 text-muted-foreground'>
                  <div className='flex items-center gap-1'>
                    <MapPinIcon className='h-4 w-4' />
                    <span>
                      {car.location.district}, {car.location.province}
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <StarIcon className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span>4.8 (124 đánh giá)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='specs' className='w-full'>
                  <TabsList className='grid w-full grid-cols-3'>
                    <TabsTrigger value='specs'>Thông số</TabsTrigger>
                    <TabsTrigger value='features'>Tính năng</TabsTrigger>
                    <TabsTrigger value='description'>Mô tả</TabsTrigger>
                  </TabsList>

                  <TabsContent value='specs' className='space-y-4'>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                      <div className='text-center p-4 bg-gray-50 rounded-lg'>
                        <UsersIcon className='h-6 w-6 mx-auto mb-2 text-primary' />
                        <div className='font-medium'>{car.number_of_seats} chỗ</div>
                        <div className='text-sm text-muted-foreground'>Số ghế</div>
                      </div>
                      <div className='text-center p-4 bg-gray-50 rounded-lg'>
                        <SettingsIcon className='h-6 w-6 mx-auto mb-2 text-primary' />
                        <div className='font-medium'>{getTransmissionLabel(car.transmission_type)}</div>
                        <div className='text-sm text-muted-foreground'>Hộp số</div>
                      </div>
                      <div className='text-center p-4 bg-gray-50 rounded-lg'>
                        <FuelIcon className='h-6 w-6 mx-auto mb-2 text-primary' />
                        <div className='font-medium'>{getFuelTypeLabel(car.fuel_type)}</div>
                        <div className='text-sm text-muted-foreground'>Nhiên liệu</div>
                      </div>
                      <div className='text-center p-4 bg-gray-50 rounded-lg'>
                        <CarIcon className='h-6 w-6 mx-auto mb-2 text-primary' />
                        <div className='font-medium'>{car.fuel_consumption}L/100km</div>
                        <div className='text-sm text-muted-foreground'>Tiêu hao</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='description' className='space-y-4'>
                    <p className='text-muted-foreground leading-relaxed'>{car.description}</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chủ xe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='h-12 w-12'>
                      <AvatarImage src={car.owner.avatar_url} />
                      <AvatarFallback>{car.owner.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium'>{car.owner.username}</span>
                        {car.owner.verified && <ShieldCheckIcon className='h-4 w-4 text-blue-500' />}
                      </div>
                      <div className='text-sm text-muted-foreground'>{car.owner.trips_count} chuyến đi</div>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' size='sm'>
                      <PhoneIcon className='h-4 w-4 mr-2' />
                      Gọi
                    </Button>
                    <Button variant='outline' size='sm'>
                      <MessageCircleIcon className='h-4 w-4 mr-2' />
                      Nhắn tin
                    </Button>
                  </div>
                </div>

                <Separator className='my-4' />

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>Địa chỉ giao xe:</span>
                    <span className='font-medium'>{car.location.address_details}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className='lg:col-span-1'>
            <Card className='sticky top-4'>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Đặt xe</span>
                  <div className='text-right'>
                    <div className='text-2xl font-bold text-green-600'>
                      {car.base_price_per_day.toLocaleString('vi-VN')}₫
                    </div>
                    <div className='text-sm text-muted-foreground'>/ ngày</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Date Pickers */}
                <div className='space-y-3'>
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Ngày nhận xe</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant='outline' className='w-full justify-start mt-1'>
                          <CalendarIcon className='mr-2 h-4 w-4' />
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

                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Ngày trả xe</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant='outline' className='w-full justify-start mt-1'>
                          <CalendarIcon className='mr-2 h-4 w-4' />
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
                </div>

                {/* Price Breakdown */}
                {pickupDate && returnDate && (
                  <div className='space-y-2 p-4 bg-gray-50 rounded-lg'>
                    <div className='flex justify-between text-sm'>
                      <span>Đơn giá:</span>
                      <span>{car.base_price_per_day.toLocaleString('vi-VN')}₫/ngày</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>Số ngày thuê:</span>
                      <span>{calculateDays()} ngày</span>
                    </div>
                    <Separator />
                    <div className='flex justify-between font-medium'>
                      <span>Tổng tiền:</span>
                      <span className='text-green-600'>{calculateTotal().toLocaleString('vi-VN')}₫</span>
                    </div>
                  </div>
                )}

                {/* Booking Button */}
                <Button onClick={handleBooking} className='w-full' size='lg' disabled={!pickupDate || !returnDate}>
                  Chọn thuê
                </Button>

                {/* Additional Info */}
                <div className='text-xs text-muted-foreground space-y-1'>
                  <div className='flex items-center gap-1'>
                    <ClockIcon className='h-3 w-3' />
                  </div>
                  <div className='flex items-center gap-1'>
                    <ShieldCheckIcon className='h-3 w-3' />
                    <span>Miễn phí hủy trong 1 giờ</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
