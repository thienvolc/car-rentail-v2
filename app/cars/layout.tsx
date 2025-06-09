import { Header } from '@/components/layout/header';
import { JSX } from 'react';

export default function CarLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
