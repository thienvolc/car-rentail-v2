'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Rocket, User, Car, LogOut, Settings } from 'lucide-react';
import Logo from '../common/logo';

// Mock user data - replace with actual auth state
const mockUser = {
  isLoggedIn: true, // Change this to false to test logged out state
  name: 'Nguyễn Văn A',
  email: 'user@example.com',
  avatar: null, // Set to image URL if available
};

export function Header() {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    setIsPopoverOpen(false);
    // Redirect to home page after logout
    router.push('/');
  };

  const handleMenuClick = (path: string) => {
    setIsPopoverOpen(false);
    router.push(path);
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Logo />

        {/* Auth Section */}
        <div className='flex items-center gap-3'>
          {mockUser.isLoggedIn ? (
            /* Logged In - User Avatar with Popover */
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant='ghost' className='relative h-9 w-9 rounded-full p-0 hover:bg-accent'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={mockUser.avatar || undefined} alt={mockUser.name} />
                    <AvatarFallback className='bg-primary text-primary-foreground text-sm'>
                      {mockUser.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-56 p-0' align='end' sideOffset={8}>
                <div className='p-4'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage src={mockUser.avatar || undefined} alt={mockUser.name} />
                      <AvatarFallback className='bg-primary text-primary-foreground'>
                        {mockUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium truncate'>{mockUser.name}</p>
                      <p className='text-xs text-muted-foreground truncate'>{mockUser.email}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className='p-1'>
                  <Button
                    variant='ghost'
                    className='w-full justify-start gap-2 h-9 px-3'
                    onClick={() => handleMenuClick('/profile')}
                  >
                    <Settings size={16} />
                    <span>Hồ sơ cá nhân</span>
                  </Button>

                  <Button
                    variant='ghost'
                    className='w-full justify-start gap-2 h-9 px-3'
                    onClick={() => handleMenuClick('/my-cars')}
                  >
                    <Car size={16} />
                    <span>Danh sách xe</span>
                  </Button>

                  <Separator className='my-1' />

                  <Button
                    variant='ghost'
                    className='w-full justify-start gap-2 h-9 px-3 text-destructive hover:text-destructive hover:bg-destructive/10'
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            /* Logged Out - Login/Register Buttons */
            <>
              <Button variant='ghost' className='hidden sm:inline-flex' onClick={() => router.push('/renter/login')}>
                Đăng nhập
              </Button>
              <Button onClick={() => router.push('/renter/register')}>Đăng ký</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
