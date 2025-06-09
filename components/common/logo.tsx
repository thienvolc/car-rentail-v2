import { CarIcon } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/' className='flex items-center gap-2'>
      <CarIcon
        size={32}
        strokeWidth={2.7}
        className='bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-transparent bg-clip-text'
        style={{
          background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(29, 78, 216), rgb(126, 34, 206))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          stroke: 'url(#gradient)',
        }}
      />
      <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 bg-clip-text text-transparent'>
        Dashspace
      </span>
      <svg width='0' height='0'>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='rgb(37, 99, 235)' />
            <stop offset='50%' stopColor='rgb(29, 78, 216)' />
            <stop offset='100%' stopColor='rgb(126, 34, 206)' />
          </linearGradient>
        </defs>
      </svg>
    </Link>
  );
}
