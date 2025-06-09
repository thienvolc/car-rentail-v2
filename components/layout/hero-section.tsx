'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CarIcon, StarIcon, UsersIcon, ShieldCheckIcon } from 'lucide-react';
import { SearchBar } from '../../features/cars/car-search/search-bar';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]' />

      <div className='container relative px-4 py-20 md:py-32'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Main Heading */}
          <h1 className='mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl'>
            Thuê xe{' '}
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>dễ dàng</span>
            <br />
            cho mọi hành trình
          </h1>

          {/* Subtitle */}
          <p className='mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl'>
            Khám phá hàng nghìn xe chất lượng cao với giá cả hợp lý. Đặt xe nhanh chóng, an toàn và tiện lợi chỉ trong
            vài phút.
          </p>

          {/* Search Bar */}
          <div className='mb-12'>
            <SearchBar />
          </div>

          {/* CTA Buttons */}
          <div className='mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Button size='lg' className='text-base'>
              <Link href='/cars' className='flex items-center'>
                <CarIcon className='mr-2 h-5 w-5' />
                Tìm xe ngay
              </Link>
            </Button>
            <Button variant='outline' size='lg' className='text-base'>
              <Link href='/host/register'>
                Trở thành chủ xe
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-primary'>10,000+</div>
              <div className='text-sm text-muted-foreground'>Xe available</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-primary'>50,000+</div>
              <div className='text-sm text-muted-foreground'>Khách hàng tin tưởng</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-primary'>98%</div>
              <div className='text-sm text-muted-foreground'>Đánh giá tích cực</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='border-t bg-muted/30 py-16'>
        <div className='container px-4'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='mb-8 text-center text-2xl font-bold'>Tại sao chọn chúng tôi?</h2>
            <div className='grid gap-8 md:grid-cols-3'>
              <div className='text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
                  <ShieldCheckIcon className='h-6 w-6 text-primary' />
                </div>
                <h3 className='mb-2 font-semibold'>An toàn & Tin cậy</h3>
                <p className='text-sm text-muted-foreground'>
                  Tất cả xe đều được kiểm tra kỹ lưỡng và có bảo hiểm đầy đủ
                </p>
              </div>
              <div className='text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
                  <UsersIcon className='h-6 w-6 text-primary' />
                </div>
                <h3 className='mb-2 font-semibold'>Dịch vụ 24/7</h3>
                <p className='text-sm text-muted-foreground'>Hỗ trợ khách hàng 24/7 với đội ngũ chuyên nghiệp</p>
              </div>
              <div className='text-center'>
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
                  <CarIcon className='h-6 w-6 text-primary' />
                </div>
                <h3 className='mb-2 font-semibold'>Đa dạng lựa chọn</h3>
                <p className='text-sm text-muted-foreground'>Từ xe hơi cá nhân đến xe 7 chỗ, phục vụ mọi nhu cầu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
