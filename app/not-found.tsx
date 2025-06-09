import { DM_Sans } from 'next/font/google';
import React from 'react';

const dmSans = DM_Sans({
  subsets: ['latin'],
});

const NotFoundPage = () => {
  return (
    <div
      className={`${dmSans.className} antialiased min-h-screen flex flex-col items-center justify-center bg-white p-6`}
    >
      {/* Background image section */}
      <div
        className='w-full max-w-3xl h-96 bg-center bg-no-repeat bg-contain flex items-center justify-center'
        style={{
          backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
        }}
      >
        <h1 className='text-6xl sm:text-7xl font-bold text-center -translate-y-30'>404</h1>
      </div>

      {/* Content below the image */}
      <div className='text-center -mt-10'>
        <h3 className='text-2xl sm:text-3xl font-semibold mb-2'>Có vẻ như bạn đã đi lạc</h3>
        <p className='text-base sm:text-lg text-gray-600 mb-6'>Trang bạn đang tìm kiếm không có tồn tại!</p>
        <a
          href='/'
          className='inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded hover:bg-indigo-700 transition'
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
