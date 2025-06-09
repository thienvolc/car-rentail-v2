'use client';

import * as React from 'react';
import Logo from '../common/logo';

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between px-4'>
        <Logo />
      </div>
    </header>
  );
}
